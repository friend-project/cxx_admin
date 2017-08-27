import cookie from 'cookie';
import { isLogin } from './../server/models/UserModel';

/*
export default async (ctx, next) => {
  if (ctx.path !== '/api/track' && ctx.path !== '/login') {
    const cookies = cookie.parse( ctx.header.cookie || '' )['error-free'];
    if (cookies) {
      const rst = await login(ctx, next, JSON.parse(cookies));
      if (!rst) ctx.redirect('/login');
    } else {
      ctx.redirect('/login');
    }
  }
  await next();
};
*/


export default async (ctx, next) => {
  const cookies = cookie.parse( ctx.header.cookie || '' )['token'];
  if (!cookies) {
    if (ctx.path !== '/login') ctx.redirect('/login');
  } else {
    const opt = {
      username: cookies.split(':')[0],
      token: cookies.split(':')[1],
    }
    const rst = await isLogin(ctx, next, opt);

    if ((!rst || rst.code !== 0) && ctx.path !== '/login') {
      ctx.redirect('/login');
    }
  }

  await next();
};

