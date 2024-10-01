const Friend = require("../models/friendsModel");

module.exports.createData = async (req, res, next) => {
    console.log(req.body)
    try {
        const {userId} = req.body
        const user = await Friend.findOne({ userId});
        if (!user) {
            await Friend.create({
                userId,
                friendList: [],
                requestList: [],
            });
        } 
        return res.json({status: true})
    } catch (ex) {
      next(ex);
      return res.json({status: false})
    }
};

module.exports.addFriendList = async (req, res, next) => {
    try {
        const {userId, friendId} = req.body        
        await Friend.findOneAndUpdate(
            {userId},
            { 
                $push: { friendList: {friendId} },
                $pull: { requestList: {friendId} }
            },
        ) 
        await Friend.findOneAndUpdate(
            {userId: friendId},
            { 
                $push: { friendList: {friendId: userId}},
                $pull: { requestList: {friendId: userId} }
            },

        )
        return res.json({status: true})
    } catch (ex) {
      next(ex);
      return res.json({status: false})
    }
}

module.exports.addRequestList = async (req, res, next) => {
    try {
        const {userId, friendId} = req.body
        const user = await Friend.findOne({ userId});
        if (!user) {
            await Friend.create({
                userId,
                friendList: [],
                requestList: [],
            });
        } 
        const update =  await Friend.findOneAndUpdate(
            {userId},
            { $push: { requestList: {friendId} } }
        ) 
        return res.json({status: true})
    } catch (ex) {
        next(ex);
        return res.json({status: false})
    }
}

module.exports.getFriendData = async (req, res, next) => {
    try {
        const friendData = await Friend.find({ userId: req.params.id }).select([
            "userId",
            "friendList",
            "requestList",
        ])
        if (friendData.length > 0) {
            return res.json({status: true, friendData})
        }
        return res.json({status: false, msg: "Invalid id"})
    } catch (ex) {
        next(ex);
        return res.json({status: false, msg: ex})
    }
}