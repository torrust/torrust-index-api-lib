import {PublicSettings, Settings} from "torrust-index-types-lib";
import {IRestResource} from "../restResource";
import {Rest} from "../rest";
import {fetchGet} from "../../../utils/fetch";

type GetSettingsResponse = {
    data: Settings
}

type GetPublicSettingsResponse = {
    data: PublicSettings
}

export class SettingsResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    public async getSettings(): Promise<Settings> {
        return await fetchGet<GetSettingsResponse>(
            `${this.client.apiBaseUrl}/settings`,
            { "Authorization": `Bearer ${this.client.authToken}` }
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    public async getPublicSettings(): Promise<PublicSettings> {
        return await fetchGet<GetPublicSettingsResponse>(
            `${this.client.apiBaseUrl}/settings/public`
        )
            .then((res) => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }
}
