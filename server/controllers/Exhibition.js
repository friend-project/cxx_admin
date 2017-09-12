import ExhibitionModel from './../models/ExhibitionModel';
import cfg from './../../config/app';

const Exhibition = {};

Exhibition.list = async (ctx, next) => {
  try {
    const data = await ExhibitionModel.list(ctx, next);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Exhibition.add = async (ctx, next) => {
  try {
    const opt = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
      subhead: ctx.request.body.title,
      thumb_img: ctx.request.body.thumb_img,
    }
    const data = await ExhibitionModel.add(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Exhibition.dlt = async (ctx, next) => {
  try {
    const opt = {
      id: ctx.request.body.id,
    }
    const data = await ExhibitionModel.dlt(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Exhibition.detail = async (ctx, next) => {
  try {
    const opt = {
      id: ctx.params.id,
    }
    const data = await ExhibitionModel.detail(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default Exhibition;

