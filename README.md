# 🔐 paste.id — api

`paste.id` is an encrypted paste storage server built using JS

This is the server/api repository. If you are looking for the client repository click [here](https://github.com/posixpascal/pasteid-web)

## Installation

paste.id is a very very very basic server built using NodeJS. 
To install paste.id clone this repository and run:

```bash
npm install .
```

Once npm runs through successfully add a .env file within the root directory which contains your mySQL credentials as well as the port we're running on:

```
MYSQL_HOST=127.0.0.1
MYSQL_USER=root
MYSQL_PASS=root
MYSQL_DB=pasteid

PORT=3002
```

## Running
Running paste.id server is as easy as executing a few npm scripts. 
If you are curious what scripts can be launched take a look at `package.json`.

### DB migration:
Once your `.env` file is ready and your npm dependencies are installed,
just execute `node migrate.js` to create the necessary database tables.

### In Development
To run paste.id server in development mode run:
```
npm run start-dev
```

This command will automatically start nodemon which will continously watch for file changes and reload paste.id server accordingly.

### In Production

Running on production requires an intermediate step where you build and compile your application. 

```bash
npm run build # only on code change
npm run production
```

I'm using `forever` which will start your app and restart it automatically if it should crash.

## Dependencies

paste.id server has only a handful of production dependencies these being:

- mysql (node module)
- dotenv
- express

## How it works
Since the main logic is happening on paste.id frontend I can explain this server with just a few words:

Basically this server has 2 endpoints:

- `POST /storage` which will accept a `content` property and store it in a mySQL DB
- `GET /:id` will output a JSON payload which contains a `content` property which itself contains the message you stored before.

So all in all, paste.id server is just a stupid simple text storage over HTTP.
The encryption layer is provided by the paste.id frontend application.

## License

```
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
```

## Contribution
Contribution is generally appreciated. Here are a few things you can do to extend paste.id server:

- Add unit tests
- Replace mySQL in pasteRepository.js with an ORM so we can hook up other DBs
- Extract the DB storage mechanism in a different class so we later add storage to textfiles as well by injecting the required `StorageMechanism`
- Add better error handling
- Add support to "verify" a pgp encrypted paste without outputting the content by accepting a public key via variable.
- Add scripts to auto-remove logfiles etc.
- Add expiration to pastes.
- Add option to generate a more "random" ID rather than using the SQL autoincrement ID.

