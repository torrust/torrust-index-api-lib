import HttpService from "../http-service";
import {Torrent} from "../types/torrent";

type GetTorrentResponse = {
    data: Torrent;
}

export async function getTorrent(torrentId: number): Promise<Torrent> {
    return await HttpService.get<GetTorrentResponse>(`/torrent/${torrentId}`)
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

export async function deleteTorrent(torrentId: number): Promise<boolean> {
    return await HttpService.delete<DeleteTorrentResponse>(`/torrent/${torrentId}`, {})
        .then((_res) => {
            return Promise.resolve(true);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}
