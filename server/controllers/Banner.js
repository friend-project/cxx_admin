import BannerModel from './../models/BannerModel';

const Banner = {};

Banner.add = async (ctx, next) => {
  try {
    const opt = {
      turn: ctx.request.body.turn || 0,
      img: ctx.request.body.img,
      uri: ctx.request.body.uri || '#',
    }
    const data = await BannerModel.add(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Banner.list = async (ctx, next) => {
  try {
    const data = await BannerModel.list(ctx, next);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

Banner.dlt = async (ctx, next) => {
  try {
    const opt = {
      id: ctx.request.body.id,
    }
    const data = await BannerModel.dlt(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default Banner;
