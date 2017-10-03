import GeneralModel from './../models/GeneralModel';
import cfg from './../../config/app';

const General = {};

General.add = async (ctx, next) => {
  try {
    const opt = {
      content: ctx.request.body.content,
      id: ctx.request.body.id,
    }
    const data = await GeneralModel.add(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

General.detail = async (ctx, next) => {
  try {
    const opt = {
      id: ctx.params.id,
    }
    const data = await GeneralModel.detail(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default General;

