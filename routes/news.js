//引入并实例化路由
const router = require('koa-router')(); 

router.get('/',(ctx)=>{
   ctx.body = '新闻列表'
})

router.get('/info',(ctx)=>{
    ctx.body = '新闻详情'
 })

module.exports = router;