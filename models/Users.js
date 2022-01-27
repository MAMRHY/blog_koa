// import Base from './Base';
const Base  = require('./Base')
const db = Base.getInstance()

class Users {
  /**
   * 用户登录
   * @param username 
   * @returns 
   */
   login(username,password) {
    var Sql = `select id,name,psw from users where name='${username}'`;

    console.log('loginsql', Sql)
    // var addSqlParams = [password];
    return db.query(Sql)
  }
  /**
   * 获取用户
   * @param 
   * @returns 
   */
   async getUsersList(search, page, pageSize) {
    var total;
    let totalSql = 'select COUNT(*) as total from users'
    var totalres = await db.query(totalSql)
        total = totalres[0].total
    var Sql = `select * from users limit ${(page-1)*pageSize}, ${pageSize} `;
    if(search != ''){
      if(Number(search) == search){
        Sql = `select * from users where id='${search}'`
      }else{
        Sql = `select * from users where name like "%${search}%"`
      }
    }
    return {res:db.query(Sql),total:total} 
  }
  /**
   * 添加用户
   * @param users 
   * @returns 
   */
  addUser(username, password) {
    var totalSql = 'SELECT COUNT(*) AS COUNT FROM users'
    var addSql = `INSERT INTO users(name,psw) VALUES('${username}','${password}')`;
    console.log(addSql);
    return db.query(addSql)
  }

   /**
   * 编辑
   * @param users 
   * @returns 
   */
    editUser(id,username, password) {
      var editSql = `UPDATE users SET name = '${username}',psw='${password}' WHERE id = '${id}' `;
      console.log(editSql);
      return db.query(editSql)
    }

     /**
   * 删除
   * @param id 
   * @returns 
   */
      delUser(id) {
        var delSql = ` DELETE FROM users WHERE id=${id}  `;
        console.log(delSql);
        return db.query(delSql)
      }

}
module.exports = Users;
