// import React from 'react';
// import { StaticRouter as Router, matchPath } from 'react-router';
// import { renderToString } from 'react-dom/server';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import serialize from 'serialize-javascript';
// 
// import rootReducer from './../client/reducers';
// import App from './../client/app';

// render first screen
const temp = (content, initialState) => (
`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>古聞铭</title>
<meta content="yes" name="apple-touch-fullscreen">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
<link rel="stylesheet" href="/styles/app.css">
</head>
<body>
<div id="app" style="height: 100%"></div>
<script src="/library/react.js"></script>
<script src="/scripts/app.js"></script>
</body>
</html>`
);

export default async (ctx, next) => {
    ctx.body = temp();

    await next();
};
