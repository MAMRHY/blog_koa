const Base = require('./Base')
const db = Base.getInstance()
const moment = require('moment')
moment.locale('zh-cn')

class Discuss{

    // 发表评论
    addDiscuss(val){

        let time = moment().format('YYYY-MM-DD HH:mm:ss')    // 获取时间
        const avatar = 'https://joeschmoe.io/api/v1/random'  //默认头像
 
        const sql = 'INSERT INTO discuss(userid, avatar, author,articleid,content,datetime) VALUES (?,?,?,?,?,?)'
        const data = [val.userid, avatar, val.username, val.articleid,val.content, time];

        return db.query(sql, data)
    

    }

    // 根据文章id获取评论列表
    getDiscussList(id){

        const sql = `select * from discuss where articleid=${id}`
        return db.query(sql)

    }

}

module.exports = Discuss