const ModelsDiscuss = require('../models/Discuss')
const mDiscuss = new ModelsDiscuss()


class Discuss{
    // 发表评论
    addDiscuss(val){
        let res = mDiscuss.addDiscuss(val)
        return res
    }

    getDiscussList(id){
        let res = mDiscuss.getDiscussList(id)
        return res
    }

}

module.exports = Discuss