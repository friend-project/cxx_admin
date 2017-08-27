import Router from 'koa-router';
import Weather from './../controllers/Weather';
import Cxx from './../controllers/Cxx';
import User from './../controllers/User';

const router = new Router({
    prefix: '/api'
});

/*
 * @brief 测试数据
 * params  id
 * @return json
 */
router.get('/weather/:id', Weather.test);

/*
 * @brief 测试数据
 * params  id
 * @return json
 */
router.get('/cxx', Cxx.test);

/*
 * @brief 测试数据
 * params  id
 * @return json
 */
router.post('/login', User.login);

export default router;

