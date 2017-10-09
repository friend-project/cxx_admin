import mysql from 'mysql';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cxx'
});

const BannerModel = {};

BannerModel.list = async (ctx, next) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          'SELECT * FROM banner order by turn desc',
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

BannerModel.add = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `insert into banner (turn, img, uri) values ('${opt.turn}', '${opt.img}', '${opt.uri}')`,
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

BannerModel.dlt = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `delete from banner where id=${opt.id}`,
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

export default BannerModel;
