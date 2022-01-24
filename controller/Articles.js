const ModelsArticles = require('../models/Articles')
const mArticles = new ModelsArticles()

class Articles{

    async getArticles(page, pageSize){
        let res = await mArticles.getArticles(page,pageSize)
        let obj = {}
        await res.res.then((l)=>{
            obj.list = l
        })
        obj.total = res.total
        return obj;
    }

    //添加(编辑)文章
    async addArticles(val){
        let res = await mArticles.addArticles(val)
        return res
    }


    //查询文章详情
    async getArticleInfo(id){
        let res = await mArticles.getArticlesInfo(id)
        return res
    }


    async delArticles(id){
        let res = await mArticles.delArticles(id)
        return res
    }

    async getTagClassify(){
        let res = await mArticles.getTagClassify()
        return res
    }

}

module.exports = Articles