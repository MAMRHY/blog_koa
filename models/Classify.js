const Base  = require('./Base')
const db = Base.getInstance()

class Classify{

    async getClassify(page, pageSize){
        var total;
        let totalSql = 'select COUNT(*) as total from categories'
        var totalres = await db.query(totalSql)
        total = totalres[0].total
        var Sql = `select * from categories limit ${(page-1)*pageSize}, ${pageSize} `;
        return {res:db.query(Sql),total:total} 
    }

    addClassify(name){
        var sql = `INSERT into categories(category_name) VALUES('${name}')`
        return db.query(sql)
    }

    editClassify(id,name){
        var sql = `UPDATE categories SET category_name = '${name}' where id=${id}`
        return db.query(sql)
    }

    delClassify(id){
        var sql = `DELETE FROM categories WHERE id=${id}`
        return db.query(sql)
    }

}

module.exports = Classify;