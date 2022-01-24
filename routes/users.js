//引入并实例化路由
const router = require('koa-router')(); 

const Users = require('../models/Users');
const Cusers = require('../controller/Users')
const users  = new Users()
const cusers = new Cusers()

router.get('/',async (ctx)=>{
   let search = ctx.query.search? ctx.query.search : ''
   let page = ctx.query.page? ctx.query.page : 1 ;  //当前页码
   let pageSize = ctx.query.pageSize? ctx.query.pageSize : 2 ;  //每页条数
   let res = await cusers.getUsersList(search, page, pageSize)
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

router.post('/login',async (ctx)=>{
   let username = ctx.request.body.username
   let password = ctx.request.body.password
   let data  = await users.login(username)
   console.log(data);
   if(data.length == 1){
      if(data[0].psw === password){
         ctx.body = {
            code: 200,
            id: data[0].id
         };
      }else{
         ctx.body = {
            code: 400,
            message: '密码不正确'
         };
      } 
   }
   else{
      ctx.body = {
         code: 400,
         message: '没有此用户'
      };
   }

})

router.post('/add',async (ctx)=>{
   let uname = ctx.request.body.username
   let psw = ctx.request.body.password
   let res = await cusers.addUser(uname,psw);
   ctx.body = {
      code: 200,
      id: res.insertId,
      message: 'success'
   }
})

router.post('/edit',async (ctx)=>{
   let uname = ctx.request.body.username
   let psw = ctx.request.body.password
   let id = ctx.request.body.id
   let res = await cusers.editUser(id,uname,psw);
   if(res.affectedRows === 1){
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

router.delete('/del',async (ctx)=>{
   let id = ctx.query.id
   let res = await cusers.delUser(id);
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

router.get('/info/:id',(ctx)=>{
    ctx.body = '用户详情'+ctx.params.id
 })

module.exports = router;