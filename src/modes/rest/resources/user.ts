import {Rest} from "../rest";
import {IRestResource} from "../restResource";
import {fetchGet, fetchPost} from "../../../utils/fetch";
import { TokenResponse, UserProfile } from "torrust-index-types-lib";


type LoginUserParams = {
    login: string
    password: string
}

type LoginUserResponse = {
    data: TokenResponse
}

type RenewedTokenResponse = {
    data: TokenResponse
}

type RegisterUserParams = {
    username: string
    email: string
    password: string
    confirm_password: string
}

type ChangePasswordParams = {
    current_password: string
    password: string
    confirm_password: string
}

type Token = {
    token: string
}

type AddedUserResponse = {
    data: NewUser
}

type NewUser = {
    user_id: number
}

type GetUserProfilesParams = {
    pageSize: number
    page: number
    sorting?: string
    filters?: Array<string>
    searchQuery?: string
}

type GetUserProfilesResponseData = {
    total: number
    results: Array<UserProfile>
}

type GetUserProfilesResponse = {
    data: GetUserProfilesResponseData
}

export class UserResource implements IRestResource {
    client: Rest;

    constructor(client: Rest) {
        this.client = client;
    }

    async loginUser(params: LoginUserParams): Promise<TokenResponse> {
        return await fetchPost<LoginUserResponse>(
            `${this.client.apiBaseUrl}/user/login`,
            JSON.stringify(params),
            { "Content-Type": "application/json" }
        )
            .then((res) => {
                // Update auth token.
                this.client.setToken(res.data.token);

                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async registerUser(params: RegisterUserParams): Promise<boolean> {
        return await fetchPost<AddedUserResponse>(
            `${this.client.apiBaseUrl}/user/register`,
            JSON.stringify(params),
            { "Content-Type": "application/json" }
        )
            .then(() => {
                return Promise.resolve(true);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async renewToken(): Promise<TokenResponse> {
        return await fetchPost<RenewedTokenResponse>(
            `${this.client.apiBaseUrl}/user/token/renew`,
            JSON.stringify({ token: this.client.authToken ?? "" }),
            { "Content-Type": "application/json"}
        )
            .then((res) => {
                // Update auth token.
                this.client.setToken(res.data.token);

                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }

    async changePassword(params: ChangePasswordParams, username: string): Promise<boolean> {
        return await fetchPost<void>(
            `${this.client.apiBaseUrl}/user/${username}/change-password`,
            JSON.stringify(params),
            {
                "Authorization": `Bearer ${this.client.authToken}`,
                "Content-Type": "application/json"
            }
        )
            .then(() => {
                return Promise.resolve(true);
            })
            .catch((err) => {
                return Promise.reject(err.response?.data?.error ?? err);
            });
    }
    async getUserProfiles(params: GetUserProfilesParams): Promise<GetUserProfilesResponseData> {
        return await fetchGet<GetUserProfilesResponse>(
            `${this.client.apiBaseUrl}/users?page_size=${params.pageSize}&page=${params.page - 1}&sort=${params.sorting}${params.filters ? "&filters=" + params.filters.join(",") : ""}${params.searchQuery ? "&search=" + params.searchQuery : ""}`,
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

