import {TorrentCategory} from "torrust-index-types-lib";
import {IRestResource} from "../restResource";
import {Rest} from "../rest";
import {fetchDelete, fetchGet, fetchPost} from "../../../utils/fetch";

type GetCategoriesResponse = {
    data: Array<TorrentCategory>
}

type CategoryResponse = {
    data: string
}

type DeleteCategoryParams = {
    name: string
}

export class CategoryResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    async getCategories(): Promise<Array<TorrentCategory>> {
        return await fetchGet<GetCategoriesResponse>(
            `${this.client.apiBaseUrl}/category`
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async addCategory(name: string): Promise<string> {
        return await fetchPost<CategoryResponse>(
            `${this.client.apiBaseUrl}/category`,
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

    async deleteCategory(name: string): Promise<string> {
        return await fetchDelete<DeleteCategoryParams, CategoryResponse>(
            `${this.client.apiBaseUrl}/category`,
            { name },
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
}

