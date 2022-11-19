import * as dotenv from 'dotenv';
import * as torrent from "./rest/torrent";

dotenv.config();

const graphql = {}

const rest = {
    torrent
}

export { graphql, rest }
