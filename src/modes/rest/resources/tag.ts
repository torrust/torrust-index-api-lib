import {IRestResource} from "../restResource";
import {Rest} from "../rest";
import {TorrentTag} from "../../../../../torrust-index-types-lib";
import {fetchDelete, fetchGet, fetchPost} from "../../../utils/fetch";

type TagResponse = {
    data: TorrentTag
}

type DeleteTagPrams = {
    tag_id: number
}

type GetTagsResponse = {
    data: Array<TorrentTag>
}

export class TagResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    async addTag(name: string): Promise<string> {
        return await fetchPost<any>(
            `${this.client.apiBaseUrl}/tag`,
            JSON.stringify({ name }),
            {
                "Authorization": `Bearer ${this.client.authToken}`,
                "Content-Type": "application/json"
            }
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async deleteTag(id: number): Promise<number> {
        return await fetchDelete<DeleteTagPrams, any>(
            `${this.client.apiBaseUrl}/tag`,
            { tag_id: id },
            {
                "Authorization": `Bearer ${this.client.authToken}`,
                "Content-Type": "application/json"
            }
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
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
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }
}
