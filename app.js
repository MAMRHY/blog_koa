const Koa = require('koa')
const app = new Koa()


const router = require('koa-router')(); //引入并实例化

const users = require('./routes/users')
const news = require('./routes/news')
const classify = require('./routes/classify')
const tags = require('./routes/tags')
const articles = require('./routes/articles')
const discuss = require('./routes/discuss')


const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')()
app.use(bodyParser)
// TODO 完了之后写一个接口文档
app.use(
    cors({
        origin:function (ctx) {
            return '*';
        },
        credentials:true,
        allowMethods: ['GET','POST','DELETE'],
        allowHeaders: ['Content-Type','Authorization','Accept', 'Access-Control-Allow-Origin'],
    })
)


router.use('/users',users.routes());  
router.use('/news',news.routes()); 
router.use('/classify', classify.routes()) 
router.use('/tags', tags.routes()) 
router.use('/articles', articles.routes()) 
router.use('/discuss', discuss.routes()) 

app.use(router.routes())  //启动路由
app.use(router.allowedMethods());  //也可不写，最好写。





app.listen(3001,()=>{
    console.log("starting at port 3001");
})