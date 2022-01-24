const MoudelUsers = require('../models/Users')
const mUsers = new MoudelUsers()
 
 class Users{
    async getUsersList(search, page, pageSize){
        let res = await mUsers.getUsersList(search, page, pageSize)
        let obj = {}
        await res.res.then((l)=>{
            obj.list = l
        })
        obj.total = res.total
        console.log('obj',obj);
        return obj;
        // console.log('ccc',res);
        // return res
    }

    async addUser(u,p){
        let res = await mUsers.addUser(u,p)
        return res
    }

    async editUser(id,u,p){
        let res = await mUsers.editUser(id,u,p)
        return res
    }

    async delUser(id){
        let res = await mUsers.delUser(id)
        return res
    }
}

module.exports = Users