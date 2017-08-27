import UserModel from './../models/UserModel';
import cfg from './../../config/app';

const User = {};

User.login = async (ctx, next) => {
  try {
    const opt = {
      username: ctx.request.body.username,
      password: ctx.request.body.password,
    }
    const data = await UserModel.login(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    // ctx.body = data.code === 0 ? data.response : data.error;
    ctx.body = data;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};


export default User;

