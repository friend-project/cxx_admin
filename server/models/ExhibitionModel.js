import mysql from 'mysql';
import cfg from './../../config/app';
import md5 from 'md5';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'm',
  database : 'cxx'
});

const ExhibitionModel = {};

ExhibitionModel.list = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          'SELECT * FROM exhibition',
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

ExhibitionModel.add = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `insert into exhibition (title, content) values ('${opt.title}', '${opt.content}')`,
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

ExhibitionModel.dlt = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `delete from  exhibition where id=${opt.id}`,
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
export default ExhibitionModel;

