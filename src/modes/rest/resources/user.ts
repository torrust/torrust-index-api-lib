import {Rest} from "../rest";
import {IRestResource} from "../restResource";
import {fetchPost} from "../../../utils/fetch";
import {TokenResponse} from "torrust-index-types-lib";

type LoginUserParams = {
    login: string
    password: string
}

type LoginUserResponse = {
    data: TokenResponse
}

type RegisterUserParams = {
    username: string
    email: string
    password: string
    confirm_password: string
}

type Token = {
    token: string
}

type AddedUserResponse = {
    data: {
        user_id: number
    }
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
        return await fetchPost<LoginUserResponse>(
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
}
