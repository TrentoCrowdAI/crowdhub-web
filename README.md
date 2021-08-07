# CrowdHub

CrowdHub sits on top of major crowdsourcing platforms to intelligently assist customers in performing crowdsourcing tasks.

Paper: [CrowdHub: Extending crowdsourcing platforms for the controlled evaluation of tasks designs](https://arxiv.org/abs/1909.02800).

[![Watch the video](./public/video-preview.png)](https://drive.google.com/file/d/1sNbreDkoVYnbrRFJ4A4kWAHajJiUMP9l/view)


# crowdhub-web

This repository contains the client-side code of CrowdHub.

[Link to the backend](https://github.com/TrentoCrowdAI/crowdhub-api)

This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

The webapp is hosted on [Github pages](https://trentocrowdai.github.io/crowdhub-web).

## Documentation
You can find the developer and user documentation on the [wiki of this repository](https://github.com/TrentoCrowdAI/crowdhub-web/wiki).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run deployDev` and `npm run deployProd`

Builds the app and then publishes it on Github Pages. The difference between the two commands is that `deployDev` builds
the app that will consume the APIs from the development server, while `deployProd` build the app that will use the production
server.
