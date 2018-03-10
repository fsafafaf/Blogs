import Router from 'koa-router'
import config from '../config'
import db from '../models'
const user = require('../controllers/user')
const router = new Router({
  prefix: config.app.routerBaseApi
})
// url /api/user => router 匹配
// => controller 后端 业务逻辑
// => model view 通信
router
  .get('/user', user.getUserInfo)

export default router
