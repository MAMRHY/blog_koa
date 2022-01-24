const MoudelClassify = require('../models/Classify')
const mClassify = new MoudelClassify()

class Classify{

    async getClassify(page,pageSize){
        let res = await mClassify.getClassify(page, pageSize)
        let obj = {}
        await res.res.then((l)=>{
            obj.list = l
        })
        obj.total = res.total
        console.log('obj',obj);
        return obj;
    }

    async addClassify(name){
        let res = await mClassify.addClassify(name)
        return res
    }

    async editClassify(id,name){
        let res = await mClassify.editClassify(id,name)
        return res
    }

    async delClassify(id){
        let res = await mClassify.delClassify(id)
        return res
    }

}

module.exports = Classify