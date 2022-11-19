import axios, {AxiosResponse} from "axios";
import endpoint from "./endpoints.config";
import {User} from "./types/user";

const LOCAL_STORAGE_USER_KEY = "torrust_user";

export default new class {
    // @ts-ignore
    userToken?: string;

    constructor() {
        axios.defaults.baseURL = endpoint.ApiBaseUrl;

        axios.interceptors.response.use(undefined, (err) => {
            if (err.response && err.response.status === 401) {
                // Not authorized, so the userToken is expired and should be cleared
                this.clearToken();

                return;
            }

            // If it's not a 401 continue to other error handlers
            return Promise.reject(err);
        });

        this.readToken();
    }

    readToken() {
        // Read user json from local storage
        const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY) ?? "";

        const user = User.fromJson(userJson);

        if (user.token) {
            this.userToken = user.token;
        }
    }

    clearToken() {
        this.userToken = undefined;

        localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    }

    setToken() {
        if (!!this.userToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.userToken}`;
        }
    }

    get<T>(url: string): Promise<AxiosResponse<T>> {
        this.setToken();

        return axios.get<T>(url);
    }

    delete<T>(url: string, data: Object): Promise<AxiosResponse<T>> {
        this.setToken();

        return axios.delete<T>(url, { data });
    }
}
