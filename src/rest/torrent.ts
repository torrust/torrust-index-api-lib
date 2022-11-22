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
    return await HttpService.delete<DeleteTorrentResponse>(`${apiBaseUrl}/torrent/${torrentId}`, {})
        .then((_res) => {
            return Promise.resolve(true);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export async function downloadTorrent(apiBaseUrl: string, torrentId: number): Promise<Blob> {
    return await HttpService.getBlob(`${apiBaseUrl}/torrent/download/${torrentId}`)
        .then((res) => {
            let blob = new Blob([res.data]);
            return Promise.resolve(blob);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
