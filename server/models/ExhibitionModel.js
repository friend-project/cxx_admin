import mysql from 'mysql';
import cfg from './../../config/app';
import md5 from 'md5';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cxx'
});

const ExhibitionModel = {};

ExhibitionModel.list = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          'SELECT id, title, subhead, thumb_img, update_time FROM exhibition',
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
    let query = '';
    if (opt.id) {
      query = `update exhibition set title='${opt.title}', subhead='${opt.subhead}', thumb_img='${opt.thumb_img}', content='${opt.content}' where id=${opt.id}`;
    } else {
      query = `insert into exhibition (title, subhead, thumb_img, content) values ('${opt.title}', '${opt.subhead}', '${opt.thumb_img}', '${opt.content}')`;
    }
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

ExhibitionModel.detail = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `select * from  exhibition where id=${opt.id}`,
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

