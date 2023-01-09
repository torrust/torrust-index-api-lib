import {CategoryResource} from "./resources/category";
import {SettingsResource} from "./resources/settings";
import {TorrentResource} from "./resources/torrent";
import {UserResource} from "./resources/user";

const LOCAL_STORAGE_TOKEN_KEY = "torrust_token";

export class Rest {
  public apiBaseUrl: string;
  public authToken?: string;
  public category: CategoryResource;
  public settings: SettingsResource;
  public torrent: TorrentResource;
  public user: UserResource;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;

    this.getToken();

    this.category = new CategoryResource(this);
    this.settings = new SettingsResource(this);
    this.torrent = new TorrentResource(this);
    this.user = new UserResource(this);
  }

  public getToken() {
    // Should only work in a browser, not in Node.
    if (typeof window === "undefined") return;

    // Read user json from local storage.
    const authToken = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    if (authToken) {
      this.setToken(authToken);
    }
  }

  public setToken(authToken: string) {
    // Should only work in a browser, not in Node.
    if (typeof window === "undefined") return;

    this.authToken = authToken;

    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, authToken);
  }

  public deleteToken() {
    // Should only work in a browser, not in Node.
    if (typeof window === "undefined") return;

    this.authToken = undefined;

    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }
}
