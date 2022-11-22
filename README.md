A simple TypeScript/ES6 library that contains API calls used by the Torrust Index project.

## Install

You can install this library using NPM:

```sh
npm i -S torrust-index-api-lib torrust-index-types-lib
```

Then import either the Rest or GraphQL (WIP) API library:

### Rest

```js
import {rest} from "torrust-index-api-lib";
```

### GraphQL

```js
import {graphql} from "torrust-index-api-lib";
```

## Usage (Rest)

### Torrent

Example of retrieving a single torrent using its torrent_id:

```ts
import {rest} from "torrust-index-api-lib";
import {Torrent} from "torrust-index-types-lib";

const API_BASE_URL = "http://localhost:3000";
let torrentId = 1;

rest.torrent.getTorrent(API_BASE_URL, torrentId)
    .then((torrent) => {
        // torrent has type Torrent
        console.log(torrent);
    })
    .catch((err) => {
        console.error(err);
    });
```

## Usage (GraphQL)

The GraphQL API still needs to be developed.
