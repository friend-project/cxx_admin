import Router from 'koa-router';
import User from './../controllers/User';
import File from './../controllers/File';
import Mural from './../controllers/Mural';
import Exhibition from './../controllers/Exhibition';
import General from './../controllers/General';

const router = new Router({
    prefix: '/api'
});

/*
 * @brief 测试数据
 * params  id
 * @return json
 */
router.post('/login', User.login);

/*
 * @brief 文件上传
 * @return null
 */
router.post('/file', File.map);

/*
 * @brief 壁画列表
 * @return result
 */
router.get('/muralList', Mural.list);

/*
 * @brief 上传壁画
 * @return result
 */
router.post('/muralAdd', Mural.add);

/*
 * @brief 添加壁画
 * @return result
 */
router.post('/muralDelete', Mural.dlt);

/*
 * @brief 展览列表
 * @return result
 */
router.get('/exhibitionList', Exhibition.list);

/*
 * @brief 展览详情
 * @return result
 */
router.get('/exhibitionDetail/:id', Exhibition.detail);

/*
 * @brief 上传壁画
 * @return result
 */
router.post('/exhibitionAdd', Exhibition.add);

/*
 * @brief 删除壁画
 * @return result
 */
router.post('/exhibitionDelete', Exhibition.dlt);

/*
 * @brief 杂货铺详情
 * @return result
 */
router.get('/generalDetail/:id', General.detail);

/*
 * @brief 杂货铺添加
 * @return result
 */
router.post('/generalAdd', General.add);

export default router;

