import AboutModel from './../models/AboutModel';
import cfg from './../../config/app';

const About = {};

About.detail = async (ctx, next) => {
  try {
    const data = await AboutModel.detail(ctx, next);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

About.add = async (ctx, next) => {
  try {
    const opt = {
      content: ctx.request.body.content,
    }
    const data = await AboutModel.add(ctx, next, opt);

    ctx.status = data.code === 0 ? 200 : 404;
    ctx.body = data.code === 0 ? data.response : data.error;
  } catch (e) {
    ctx.logger.error(new Error(e));
  }
};

export default About;

