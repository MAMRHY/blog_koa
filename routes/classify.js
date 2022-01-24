const router = require('koa-router')(); 
const cClassify  = require('../controller/Classify')
const cclassify = new cClassify()

// 获取分列表
router.get('/',async (ctx)=>{
    let page = ctx.query.page? ctx.query.page : 1 ;  //当前页码
    let pageSize = ctx.query.pageSize? ctx.query.pageSize : 2 ;  //每页条数
    let res = await cclassify.getClassify(page, pageSize)
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

//添加分类
router.post('/add', async (ctx)=>{
    let name = ctx.request.body.name
    let res = await cclassify.addClassify(name)
    console.log('route',res);
    ctx.body = {
        code: 200,
        id: res.insertId,
        message: 'success'
     }
})

// 编辑分类
router.post('/edit',async (ctx)=>{
    let id = ctx.request.body.id
    let name = ctx.request.body.name
    let res = await cclassify.editClassify(id, name)
    if(res){
        ctx.body = {
            code: 200,
            message: 'success'
        }
    }

})

// 删除分类
router.delete('/del', async (ctx)=>{
    let id = ctx.query.id
    let res = await cclassify.delClassify(id)
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