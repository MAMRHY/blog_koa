const router = require('koa-router')(); 
const CArticles  = require('../controller/Articles')
const cArticles = new CArticles()

// 获取文章列表
router.get('/',async (ctx)=>{
    let page = ctx.query.page? ctx.query.page : 1 ;  //当前页码
    let pageSize = ctx.query.pageSize? ctx.query.pageSize : 2 ;  //每页条数
    let res = await cArticles.getArticles(page, pageSize)
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


//添加（编辑）文章
router.post('/add',async (ctx)=>{
    let addVal = ctx.request.body;
    console.log('addval',addVal);
    let res = await cArticles.addArticles(addVal)
    console.log('res',res);
    if(res){
        ctx.body = {
            code: 200,
            id: addVal.id?addVal.id:res.insertId,
            message: 'success'
        }
    }else{
        ctx.body = {
            code: 400,
            message: 'error'
        }
    }
})


//查询文章
router.get('/info',async(ctx)=>{
    let id = ctx.query.id
    let res  = await cArticles.getArticleInfo(id)
    if(res){
        ctx.body = {
            code: 200,
            data: res[0]
        }
    }else{
        ctx.body = {
            code: 400,
            message: 'error'
        }
    }

})



// 删除文章
router.delete('/del', async (ctx)=>{
    let id = ctx.query.id
    let res = await cArticles.delArticles(id)
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

// 获取所有分类和所有标签
router.get('/tagsClassify',async (ctx)=>{
    let res = await cArticles.getTagClassify()
    if(res){
        ctx.body = {
            code: 200,
            ...res
        }
    }
})


// -----移动端接口----

// 根据分类查文章列表
router.get('/list', async (ctx)=>{
    let classifyId = ctx.query.classifyId
    let res = await cArticles.getList(classifyId)
    console.log(res)
    if(res){
        ctx.body = {
            code : 200,
            data: res,
            message: 'success'
        }
    }else{
        ctx.body = {
            code : 400,
            message: 'error'
        }
    }
})


//查询文章
router.get('/infos',async(ctx)=>{
    let id = ctx.query.id
    let res  = await cArticles.getArticleInfos(id)
    if(res){
        ctx.body = {
            code: 200,
            data: res
        }
    }else{
        ctx.body = {
            code: 400,
            message: 'error'
        }
    }

})




module.exports = router;