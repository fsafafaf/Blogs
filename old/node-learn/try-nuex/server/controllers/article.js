//路由中间件函数
import mongoose from 'mongoose'
const Article = mongoose.model('Article')
export const getArticles = async (ctx, next) => {
    // articles 
    // await article.find() 游标
    // mongodb 20条数据 
    // 分页page 每页条limit
    // let page = ctx.params.page || 0
    // let limit = ctx.params.limit || 0
    let { page = 1, limit = 15 } = ctx.params
    // 多少条开始查
    page = Number((page - 1) * limit) || 0
    limit = Number(limit) || 15

    try {
        let total = await getArticles.find({
            public: true
        }).exec()
        total = total.length
        // 有多少篇 数据
        const data = await Article.find({
            publish: true
        }).skil(page).limit(limit).sort({ 'createdAt': -1 }).exec()
        ctx.body = {
            success: true,
            data: data,
            total: total
        }
    } catch (e) {
        ctx.body = {
            success: false,
            err: e,
            total: 0
        }
    }
}