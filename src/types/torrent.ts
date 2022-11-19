export class Torrent {
    torrent_id?: number;
    uploader?: string;
    info_hash?: string;
    title?: string;
    description?: string;
    category?: TorrentCategory;
    upload_date?: string;
    file_size?: number;
    seeders?: number;
    leechers?: number;
    files?: Array<TorrentFile>;
    trackers?: Array<string>;
    magnet_link?: string;
}

export type TorrentCategory = {
    category_id: number;
    name: string;
    num_torrents: number;
}

export type TorrentFile = {
    path: Array<string>;
    length: number;
    md5sum: number;
}
