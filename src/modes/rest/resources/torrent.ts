import {Torrent, TorrentTag, TorrentCompact} from "torrust-index-types-lib";
import {Rest} from "../rest";
import {IRestResource} from "../restResource";
import {fetchDelete, fetchGet, fetchGetBlob, fetchPost, fetchPut} from "../../../utils/fetch";

type GetTorrentResponse = {
    data: Torrent
}

type GetTorrentsParams = {
    pageSize: number
    page: number
    sorting: string
    categories?: Array<string>
    searchQuery?: string
}

type GetTorrentsResponse = {
    data: GetTorrentsResponseData
}

type GetTorrentsResponseData = {
    total: number
    results: Array<TorrentCompact>
}

type DeleteTorrentResponse = {
    data: {
        torrent_id: number
    }
}

type UpdateTorrentResponse = {
    data: Torrent
}

type UploadTorrentParams = {
    title: string
    category: string
    description: string
    tags: Array<number>
    file: any
}

type UploadTorrentResponse = {
    data: UploadTorrentResponseData
}

type UploadTorrentResponseData = {
    torrent_id: number
}

type GetTagsResponse = {
    data: Array<TorrentTag>
}

export class TorrentResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    async getTorrent(torrentId: number): Promise<Torrent> {
        return await fetchGet<GetTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/${torrentId}`
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    async getTorrents(params: GetTorrentsParams): Promise<GetTorrentsResponseData> {
        return await fetchGet<GetTorrentsResponse>(
            `${this.client.apiBaseUrl}/torrents?page_size=${params.pageSize}&page=${params.page - 1}&sort=${params.sorting}${ params.categories ? "&categories=" + params.categories.join(",") : ""}${params.searchQuery ? "&search=" + params.searchQuery : ""}`
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    async deleteTorrent(torrentId: number): Promise<boolean> {
        return await fetchDelete<any, DeleteTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/${torrentId}`,
            {},
            { "Authorization": `Bearer ${this.client.authToken}` }
        )
            .then((_res) => {
                return Promise.resolve(true);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    async updateTorrent(torrent: Torrent): Promise<Torrent> {
        return await fetchPut<Torrent, UpdateTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/${torrent.torrent_id}`,
            torrent,
            { "Authorization": `Bearer ${this.client.authToken}`, "Content-Type": "application/json" }
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    async uploadTorrent(params: UploadTorrentParams): Promise<number> {
        const formData = new FormData();

        formData.append("title", params.title);
        formData.append("description", params.description);
        formData.append("category", params.category);
        formData.append("tags", JSON.stringify(params.tags));
        formData.append("torrent", params.file);

        return await fetchPost<UploadTorrentResponse>(
            `${this.client.apiBaseUrl}/torrent/upload`,
            formData,
            { "Authorization": `Bearer ${this.client.authToken}` }
        )
            .then((res) => {
                return Promise.resolve(res.data.torrent_id);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async downloadTorrent(torrentId: number): Promise<Blob> {
        return await fetchGetBlob(
            `${this.client.apiBaseUrl}/torrent/download/${torrentId}`
        )
            .then((blob) => {
                return Promise.resolve(blob);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    async proxiedImage(url: string): Promise<Blob> {
        const headers = this.client.authToken ? { "Authorization": `Bearer ${this.client.authToken}` } : undefined;

        return await fetchGetBlob(
            `${this.client.apiBaseUrl}/proxy/image/${encodeURIComponent(url)}`,
            headers
        )
            .then((blob) => {
                return Promise.resolve(blob);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    async getTags(): Promise<Array<TorrentTag>> {
        return await fetchGet<GetTagsResponse>(
            `${this.client.apiBaseUrl}/tags`
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}
