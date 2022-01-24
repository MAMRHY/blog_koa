const mysql = require('mysql')
// import mysql from 'mysql'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog',
    port: '3307'
});
class Base {
    // 这里一定要用单例，因为不能多次连接数据库，不然就报错
    static getInstance(){
        if(! Base.instance){
            Base.instance = new Base();
        }
        return Base.instance
    }

    constructor() {
        connection.connect();
    }

    async query(sql ,values) {
        return new Promise((resolve, rejects) => {
            const addSql = sql;
            const addSqlParams = values;
            console.log('sql',addSql)
            console.log('addSqlParams',addSqlParams)
            connection.query(addSql, addSqlParams, (err, result) =>{
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    rejects(err)
                }

                console.log('--------------------------RESULT----------------------------');
                //console.log('INSERT ID:',result.insertId);        
                console.log('result:', result);
                console.log('------------------------------------------------------------\n\n');

                resolve(result)
            });
        })
    }



}

module.exports =  Base