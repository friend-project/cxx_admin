import Koa from 'koa';
import serve from 'koa-static';
import onerror from 'koa-onerror';
import path from 'path';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import webpackMiddleware from 'koa-webpack';

import routes from './../server/routes';
import render from './../library/render';
import logger from './../library/logger';
import config from './../build/dev.config';
import isLogIn from './../library/isLogIn';

const app = new Koa();
const port = process.env.PORT || 9522;

app.context.logger = logger;
app.use(cors());
app.use(bodyParser({ extended: true }));
app.use(serve(path.resolve(__dirname, './../assets/')));
app.use(serve(path.resolve(__dirname, './../uploads/')));


if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware({
    config: config,
    dev: {
      hot: true,
      noInfo: false,
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
      },
    }
  }));
}
app.use(isLogIn);

app.use(async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    return await routes.routes()(ctx, next);
  }
  return await render(ctx, next);
});

app.on('error', (err, ctx) => {
    ctx.logger.error('server error', err);
});

if (process.env.NODE_ENV === 'development') {
  onerror(app);
}

app.listen(port, () => {
    console.warn('Server run on: http://0.0.0.0:%d', port);
});
