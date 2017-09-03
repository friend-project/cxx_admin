import MuralModel from './../models/MuralModel';

const Mural = {};

Mural.add = async (ctx, next) => {
  try {
    const opt = {
      name: ctx.request.body.name,
      'small_img': ctx.request.body.sImg,
      'big_img': ctx.request.body.bImg,
    }
    const data = await MuralModel.add(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Mural.list = async (ctx, next) => {
  try {
    const data = await MuralModel.list(ctx, next);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Mural.dlt = async (ctx, next) => {
  try {
    const opt = {
      id: ctx.request.body.id,
    }
    const data = await MuralModel.dlt(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default Mural;

