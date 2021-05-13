const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const convert = require('koa-convert')
const koaStatic = require('koa-static');
const koaLoagger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const routers = require('./routes/index')
const app = new Koa();
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(convert(koaStatic(
    path.join(__dirname, './static')
)))
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3003, () => {
    console.log('The server is on port 3003')
})
