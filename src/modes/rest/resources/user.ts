import {Rest} from "../rest"
import {IRestResource} from "../restResource"
import {fetchPost} from "../../../utils/fetch"
import {User} from "torrust-index-types-lib";

type LoginUserParams = {
    login: string
    password: string
}

type LoginUserResponse = {
    data: User
}

type RegisterUserParams = {
    username: string
    email: string
    password: string
    confirm_password: string
}

export class UserResource implements IRestResource {
    client: Rest

    constructor(client: Rest) {
        this.client = client
    }

    async loginUser(params: LoginUserParams): Promise<User> {
        return await fetchPost<LoginUserParams, LoginUserResponse>(
            `${this.client.apiBaseUrl}/user/login`,
            params
        )
            .then((res) => {
                // Update auth token.
                this.client.setToken(res.data.token)

                return Promise.resolve(res.data)
            })
            .catch((err) => {
                return Promise.reject(err)
            })
    }

    async registerUser(params: RegisterUserParams): Promise<boolean> {
        return await fetchPost<RegisterUserParams, any>(
            `${this.client.apiBaseUrl}/user/register`,
            params
        )
            .then(() => {
                return Promise.resolve(true)
            })
            .catch((err) => {
                return Promise.reject(err)
            })
    }
}
