const MoudelTag = require('../models/Tag')
const mTag = new MoudelTag()

class Tag{

    async getTags(page,pageSize){
        let res = await mTag.getTags(page, pageSize)
        let obj = {}
        await res.res.then((l)=>{
            obj.list = l
        })
        obj.total = res.total
        console.log('obj',obj);
        return obj;
    }

    async addTag(name){
        let res = await mTag.addTag(name)
        return res
    }

    async editTag(id,name){
        let res = await mTag.editTag(id,name)
        return res
    }

    async delTag(id){
        let res = await mTag.delTag(id)
        return res
    }

}

module.exports = Tag