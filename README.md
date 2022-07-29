# pocket-web-rss

Basic web RSS reader.

Bootstrapped with [Create React App](https://create-react-app.dev)

Note: Fetch requests assume an XMLDocument provided by a CORS proxy. Additional configuration may be needed to fit your specific implementation.\
A compatible CORS proxy can be found [here.](https://github.com/colelewis/pocket-cors-rss-proxy)

## Demo

Try out some RSS links [here.](https://www.state.gov/rss-feeds/)\
Try pocket-web-rss out [here!](https://menthol.cloud/pocket-web-rss) Note, this demonstration runs version 1.0 which does not include CORS proxy functionality due to lack of reliable CORS proxy server hosting at this time. This may caue otherwise valid RSS links to be listed as 'invalid sources'. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
