import mysql from 'mysql';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'm',
  database : 'cxx'
});

const MuralModel = {};

MuralModel.list = async (ctx, next) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          'SELECT * FROM mural',
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

MuralModel.add = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `insert into mural (name, small_img, big_img) values ('${opt.name}', '${opt.small_img}', '${opt.big_img}')`,
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

MuralModel.dlt = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `delete from  mural where id=${opt.id}`,
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

export default MuralModel;
