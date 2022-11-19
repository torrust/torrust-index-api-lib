import {Torrent} from "./torrent";

export class User {
    public token?: string;
    public username?: string;
    public admin?: boolean;

    public hasEditRightsForTorrent(torrent: Torrent) {
        return this.admin || this.username === torrent.uploader;
    }

    public static fromJson(json: string): User {
        let user = new User();

        Object.assign(user, JSON.parse(json));

        return user;
    }
}
