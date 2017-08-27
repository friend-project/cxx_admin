import mysql from 'mysql';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'm',
  database : 'cxx'
});

const CxxModel = {};

CxxModel.test = async (ctx, next) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          'SELECT * FROM user',
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

export default CxxModel;

