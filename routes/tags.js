const router = require('koa-router')(); 
const cTags = require('../controller/Tag')
const ctags = new cTags()

// 获取标签列表
router.get('/',async (ctx)=>{
    let page = ctx.query.page? ctx.query.page : 1 ;  //当前页码
    let pageSize = ctx.query.pageSize? ctx.query.pageSize : 2 ;  //每页条数
    let res = await ctags.getTags(page, pageSize)
    if(res){
        ctx.body = {
            code: 200,
            ...res
        }
    }else{
        ctx.body = {
            code: 400,
            message: 'error'
        }
    }
})

//添加标签
router.post('/add', async (ctx)=>{
    let name = ctx.request.body.name
    let res = await ctags.addTag(name)
    ctx.body = {
        code: 200,
        id: res.insertId,
        message: 'success'
     }
})

// 编辑标签
router.post('/edit',async (ctx)=>{
    let id = ctx.request.body.id
    let name = ctx.request.body.name
    let res = await ctags.editTag(id, name)
    if(res){
        ctx.body = {
            code: 200,
            message: 'success'
        }
    }

})

// 删除标签
router.delete('/del', async (ctx)=>{
    let id = ctx.query.id
    let res = await ctags.delTag(id)
    if(res.affectedRows == 1){
        ctx.body = {
           code: 200,
           message: 'success'
        }
     }else{
        ctx.body = {
           code: 400,
           message: 'failure'
        }
     }
})


module.exports = router;