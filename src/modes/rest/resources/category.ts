import {TorrentCategory} from "torrust-index-types-lib";
import {IRestResource} from "../restResource";
import {Rest} from "../rest";
import {fetchGet} from "../../../utils/fetch";

type GetCategoriesResponse = {
    data: Array<TorrentCategory>
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
                return Promise.reject(err);
            });
    }
}

