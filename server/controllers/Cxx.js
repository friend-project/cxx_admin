import CxxModel from './../models/CxxModel';

const Cxx = {};

// 模拟数据
Cxx.test = async (ctx, next) => {
    try {
        const data = await CxxModel.test(ctx, next);

        ctx.status = data.code === 0 ? 200 : 404;
        ctx.body = data.code === 0 ? data.response : data.error;
    } catch (e) {
        ctx.logger.error(new Error(e));
    }
};

export default Cxx;

