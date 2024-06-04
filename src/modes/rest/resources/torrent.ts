import {TorrentResponse, TorrentTag, TorrentListing} from "torrust-index-types-lib";
import {Rest} from "../rest";
import {IRestResource} from "../restResource";
import {fetchDelete, fetchGet, fetchGetBlob, fetchPost, fetchPut} from "../../../utils/fetch";

type GetTorrentResponse = {
    data: TorrentResponse
}

type GetTorrentsParams = {
    pageSize: number
    page: number
    sorting: string
    categories?: Array<string>
    tags?: Array<string>
    searchQuery?: string
}

type GetTorrentsResponse = {
    data: GetTorrentsResponseData
}

type GetTorrentsResponseData = {
    total: number
    results: Array<TorrentListing>
}

type DeleteTorrentResponse = {
    data: DeleteTorrentResponseData
}

type DeleteTorrentResponseData = {
    data: {
        torrent_id: number
        info_hash: string
    }
}

type UpdateTorrentParams = {
    title?: string
    description?: string
    tags?: number[]
}

type UpdateTorrentResponse = {
    data: TorrentResponse
}

type UploadTorrentParams = {
    title: string
    category: string
    description: string
    tags: Array<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file: any
}

type NewTorrentResponse = {
    data: NewTorrentResponseData
}

type NewTorrentResponseData = {
    torrent_id: number
    canonical_info_hash: string
    info_hash: string
}

export class TorrentResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    headers(): HeadersInit | undefined {
        return this.client.authToken ? { "Authorization": `Bearer ${this.client.authToken}` } : undefined;
    }

    async getTorrentInfo(infoHash: string): Promise<TorrentResponse> {
        return await fetchGet<GetTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/${infoHash}`,
            this.headers()
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async getTorrents(params: GetTorrentsParams): Promise<GetTorrentsResponseData> {
        return await fetchGet<GetTorrentsResponse>(
            `${this.client.apiBaseUrl}/torrents?page_size=${params.pageSize}&page=${params.page - 1}&sort=${params.sorting}${params.categories ? "&categories=" + params.categories.join(",") : ""}${params.tags ? "&tags=" + params.tags.join(",") : ""}${params.searchQuery ? "&search=" + params.searchQuery : ""}`,
            this.headers()
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async deleteTorrent(infoHash: string): Promise<DeleteTorrentResponseData> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await fetchDelete<any, DeleteTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/${infoHash}`,
            {},
            this.headers()
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async updateTorrent(infoHash: string, params: UpdateTorrentParams): Promise<TorrentResponse> {
        return await fetchPut<UpdateTorrentParams, UpdateTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/${infoHash}`,
            params,
            this.headers()
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async uploadTorrent(params: UploadTorrentParams): Promise<NewTorrentResponseData> {
        const formData = new FormData();

        formData.append("title", params.title);
        formData.append("description", params.description);
        formData.append("category", params.category);
        formData.append("tags", JSON.stringify(params.tags));
        formData.append("torrent", params.file);

        return await fetchPost<NewTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/upload`,
            formData,
            this.headers()
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async downloadTorrent(infoHash: string): Promise<Blob> {
        return await fetchGetBlob(
            `${this.client.apiBaseUrl}/torrent/download/${infoHash}`,
            this.headers()
        )
            .then((blob) => {
                return Promise.resolve(blob);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async proxiedImage(url: string): Promise<Blob> {
        return await fetchGetBlob(
            `${this.client.apiBaseUrl}/proxy/image/${encodeURIComponent(url)}`,
            this.headers()
        )
            .then((blob) => {
                return Promise.resolve(blob);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }
}
