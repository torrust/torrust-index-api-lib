import HttpService from "../http-service";
import {Torrent} from "torrust-index-types-lib";

type GetTorrentResponse = {
    data: Torrent;
}

export async function getTorrent(apiBaseUrl: string, torrentId: number): Promise<Torrent> {
    return await HttpService.get<GetTorrentResponse>(`${apiBaseUrl}/torrent/${torrentId}`)
        .then((res) => {
            return Promise.resolve(res.data.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

type DeleteTorrentResponse = {
    data: {
        torrent_id: number;
    }
}

export async function deleteTorrent(apiBaseUrl: string, torrentId: number): Promise<boolean> {
    return await HttpService.delete<DeleteTorrentResponse>(`/torrent/${torrentId}`, {})
        .then((_res) => {
            return Promise.resolve(true);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
