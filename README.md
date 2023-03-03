# Get calculated stats from AirDNA

```bash
# with npm
# install server dependencies at root 
npm install

# install client dependencies in "clinet" folder
cd client/
npm install


# or with Yarn for both server and client
yarn install
```

## Usage

You'll need AirDNA `ACCESS_TOKEN`for you to use this application.

Rename a sample `.env.example` file to `.env` file in the root directory of your project. Add your `ACCESS_TOKEN` in the fields below to use this APIs.

For example:

```dosini
ACCESS_TOKEN="<AIRDNA_ACCESS_TOKEN>"
```

Additionally, we are using Google Map Embed API. For that feature to work you will need to create a [Google API Key](https://developers.google.com/maps/documentation/embed/get-api-key) and add that in the `.env` file.


For example:

```dosini
GOOGLE_MAP_KEY="<GOOGLE_MAP_API_KEY>"
```

`process.env` now has the keys and values you defined in your `.env` file and these are loaded in `config.js` file present in the `./server` directory. You can see in the below example by default the `base_url` is set to simulated account. 

```javascript
// Constants
module.exports = {
    port: process.env.PORT || 3003,
    // if you're not using docker-compose for local development, this will default to 8080
    // to prevent non-root permission problems with 80. Dockerfile is set to make this 80
    // because containers don't have that issue :)
    base_url_legacy: process.env.BASE_URL_LEGACY,
    base_url_v1: process.env.BASE_URL_V1,
    base_url_v2: process.env.BASE_URL_V2,
    access_token: process.env.ACCESS_TOKEN,
    google_map_key: process.env.GOOGLE_MAP_KEY,
};
```

## Usage

Run below commands which will start both `server` (running at port 3001) and a `client` (running at port 3000).

```bash
# using npm
npm run start

#using yarn
yarn start
```

This is just a beginning of a idea, feedback and changes are welcome.