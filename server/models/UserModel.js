import mysql from 'mysql';
import cfg from './../../config/app';
import md5 from 'md5';
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'm',
  database : 'cxx'
});

const UserModel = {};

UserModel.login = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `SELECT * FROM user where username = '${opt.username}'`,
          function (e, results, fields) {
            connection.release()
            if (e) {
              ctx.logger.error(e);
              resolve({
                code: 1,
                error: e
              });
            } else if (results.length > 0 && results[0].password === opt.password) {
              const rst = results[0];
              const token = md5(rst.id + rst.username + rst.password + cfg.token);
              ctx.cookies.set(
                'token',
                opt.username + ':' + token,
                {
                  path: '/',
                  maxAge: 24 * 60 * 1000,
                  httpOnly: false,
                  overwrite: false,
                }
              );
              resolve({
                code: 0,
                message: '成功',
                response: { },
              });
            } else {
              resolve({
                code: 2,
                message: '密码错误',
                response: { }
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

// 
UserModel.isLogin = async (ctx, next, opt) => {
  try {
    const data = await new Promise(resolve =>
      pool.getConnection(function(err, connection) {
        connection.query(
          `SELECT * FROM user where username = '${opt.username}'`,
          function (e, results, fields) {
            connection.release()
            if (e) {
              ctx.logger.error(e);
              resolve({
                code: 1,
                error: e
              });
            } else {
              const rst = results[0];
              const token = md5(rst.id + rst.username + rst.password + cfg.token);
              if (token === opt.token) {
                resolve({
                  code: 0,
                  message: '成功',
                  response: { }
                });
              } else {
                resolve({
                  code: 2,
                  message: '密码错误',
                  response: { }
                });
              }
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

export default UserModel;

