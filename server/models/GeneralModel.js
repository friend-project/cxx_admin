import mysql from 'mysql';
import cfg from './../../config/app';
import md5 from 'md5';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cxx'
});

const GeneralModel = {};

GeneralModel.add = async (ctx, next, opt) => {
  try {
    const query = `update general set content='${opt.content}' where id=${opt.id}`;
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          query,
          function (e, results, fields) {
            connection.release()
            if (e) {
              ctx.logger.error(e);
              resolve({
                code: 1,
                error: e
              });
            } else {
              resolve({
                code: 0,
                message: '成功',
                response: results,
              });
            }
          }
        );
      })
    )
    return data;
  } catch (e) {
    ctx.logger.error(e);
  }

  await next();
};


GeneralModel.detail = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `select * from  general where id=${opt.id}`,
          function (e, results, fields) {
            if (e) {
              ctx.logger.error(e);
              resolve({
                code: 1,
                error: e
              });
            } else {
              resolve({
                code: 0,
                response: results,
              });
            }
          }
        );
      })
    )
    return data;
  } catch (e) {
    ctx.logger.error(e);
  }

  await next();
};

export default GeneralModel;

