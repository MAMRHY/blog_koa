const Base  = require('./Base')
const db = Base.getInstance()

class Tag{

    async getTags(page, pageSize){
        var total;
        let totalSql = 'select COUNT(*) as total from tags'
        var totalres = await db.query(totalSql)
        total = totalres[0].total
        var Sql = `select * from tags limit ${(page-1)*pageSize}, ${pageSize} `;
        return {res:db.query(Sql),total:total} 
    }

    addTag(name){
        var sql = `INSERT into tags(tag_name) VALUES('${name}')`
        return db.query(sql)
    }

    editTag(id,name){
        var sql = `UPDATE tags SET tag_name = '${name}' where id=${id}`
        return db.query(sql)
    }

    delTag(id){
        var sql = `DELETE FROM tags WHERE id=${id}`
        return db.query(sql)
    }

}

module.exports = Tag;