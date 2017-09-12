import CopyModel from './../models/CopyModel';
import cfg from './../../config/app';

const Copy = {};

Copy.detail = async (ctx, next) => {
  try {
    const data = await CopyModel.detail(ctx, next);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Copy.add = async (ctx, next) => {
  try {
    const opt = {
      content: ctx.request.body.content,
    }
    const data = await CopyModel.add(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default Copy;

