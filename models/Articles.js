const Base = require('./Base')
const db = Base.getInstance()
const moment = require('moment')

class Articles{
    async getArticles( page, pageSize){
        console.log(page, pageSize)
        var total;
        let totalSql = 'select COUNT(*) as total from articles'
        var totalres = await db.query(totalSql)
        total = totalres[0].total
        var Sql = `select * from articles limit ${(page-1)*pageSize}, ${pageSize} `;

        // let resList = await db.query(Sql)
        // console.log('1111',resList[0].tag_list);
     

        return {res:db.query(Sql),total:total} 
    }

    //添加（编辑）文章
    async addArticles(val){
        let tag_name_list = val.selectTagsName.toString()
        let tag_list = val.selectTags.map(i=>i.id).toString()
        let add_time = moment().format('YYYY-MM-DD HH:mm:ss')    // 获取时间
        //判断id,有id是编辑否则添加
        let sql,data;
        if(val.id){//编辑
            sql = 'UPDATE articles SET title = ?, html_content = ?, md_content = ?, category_id = ?, category_name = ?, tag_list = ?,tag_name_list = ?, add_time = ? WHERE id = ?'
            data = [val.title, val.content, val.value,val.classifyid, val.classifyName, tag_list, tag_name_list, add_time,val.id];
        }else{//添加
            // let sql = `insert into articles values('${val.title}','${val.html}','${val.value}',${val.classifyid},'${val.classifyName}','${tag_list}','${tag_name_list}')`
            sql = 'INSERT INTO articles(title, html_content,md_content,category_id,category_name,tag_list,tag_name_list, add_time) VALUES (?,?,?,?,?,?,?,?)'
            data = [val.title, val.content, val.value,val.classifyid, val.classifyName, tag_list, tag_name_list, add_time];
        }
       
        return db.query(sql, data)
    }

    //根据id查询文章
    async getArticlesInfo(id){
        const sql = `select * from articles where id =${id}`
        return db.query(sql)
    }


    delArticles(id){
        var sql = `DELETE FROM articles WHERE id=${id}`
        return db.query(sql)
    }

    async getTagClassify(){
        // 查分类
        let sql = `select * from categories`
        let classifies = await db.query(sql)

        // 查标签
        sql = `select * from tags`
        let tags = await db.query(sql)

        return {
            classifies,
            tags
        }
    }


    // ----移动端接口-----

    async getList(classifyId){
        const sql = `select * from articles where category_id = ${classifyId}`
        return db.query(sql)
    }


}

module.exports = Articles