import {IRestResource} from "../restResource";
import {Rest} from "../rest";
import {TorrentTag} from "torrust-index-types-lib";
import {fetchDelete, fetchGet, fetchPost} from "../../../utils/fetch";

type DeleteTagParams = {
    tag_id: number
}

type AddTagResponse = {
    data: string // tag name
}

type GetTagsResponse = {
    data: Array<TorrentTag>
}

type DeleteTagResponse = {
    data: number // tag id
}

export class TagResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    async addTag(name: string): Promise<string> {
        return await fetchPost<AddTagResponse>(
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
        return await fetchDelete<DeleteTagParams, DeleteTagResponse>(
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
