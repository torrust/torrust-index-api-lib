import {Category} from "torrust-index-types-lib";
import {IRestResource} from "../restResource";
import {Rest} from "../rest";
import {fetchDelete, fetchGet, fetchPost} from "../../../utils/fetch";

type GetCategoriesResponse = {
    data: Array<Category>
}

type AddedCategoryResponse = {
    data: string // name
}

type DeleteCategoryParams = {
    name: string
}

type DeletedCategoryResponse = {
    data: string // name
}

export class CategoryResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    async getCategories(): Promise<Array<Category>> {
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
        return await fetchPost<AddedCategoryResponse>(
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
        return await fetchDelete<DeleteCategoryParams, DeletedCategoryResponse>(
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

