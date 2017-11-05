Chatty Appy
=====================

A simple single-page chat app that uses WebSockets and React.

Note: this app requires a server component which can be found here:
https://github.com/d-mclean/chatty_server

### Usage

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* React-Tooptip (https://www.npmjs.com/package/react-tooltip)
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
