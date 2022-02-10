const router = require('koa-router')(); 
const CDiscuss  = require('../controller/Discuss')
const cdiscuss = new CDiscuss()


// 发表评论
router.post('/add',async (ctx)=>{
    let val = ctx.request.body;
    let res = await cdiscuss.addDiscuss(val)

    if(res.affectedRows == 1){
        ctx.body = {
            code: 200,
            id: res.insertId,
            message: 'success'
        }
    }else{
        ctx.body = {
            code: 500,
            message: 'error'
        }
    }
})

// 根据文章id获取评论列表
router.get('/list',async(ctx)=>{
    let id = ctx.query.id  //文章id
    let res = await cdiscuss.getDiscussList(id)
    if(res){
        ctx.body = {
            code: 200,
            data: [...res],
            message: 'success'
        }
    }else{
       ctx.body = {
            code: 500,
            message: 'success'
       }
    }
})




module.exports = router;