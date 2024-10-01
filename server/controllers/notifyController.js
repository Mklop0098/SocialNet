const Notify = require("../models/notifyModel");

module.exports.createNotify = async (req, res, next) => {
    try {
        var datetime = new Date();
        const {userId, notify, type, from} = req.body
        const user = await Notify.findOne({ userId});
        if (!user) {
            await Notify.create({
                userId,
                notify: [],
            });
        }
        await Notify.findOneAndUpdate(
            {userId},
            { $push: { notify: {notifyMsg: notify, type, createAt: datetime, readed: false, from} } }
        ) 
        return res.json({status: true, msg: "Đã gửi yêu cầu"})
    } catch (ex) {
      next(ex);
      return res.json({status: false, msg: "Không thể gửi yêu cầu, vui lòng thử lại"})
    }
  };


  module.exports.getAllNotifies = async (req, res, next) => {
    try {
      const notify = await Notify.find({ userId: req.params.id }).select([
        "userId",
        "notify",
        "_id",
      ]);
      if (notify.length > 0) {
        return res.json({status: true, notify})
      }
      else return res.json({status: false, msg: "Invalid ID"})
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.readNotifies = async (req, res, next) => {
    try {
        await Notify.findOneAndUpdate(
            { userId: req.body.userId }, 
            { $set: { 'notify.$[].readed': true } },
          );
        const notify = await Notify.find({ userId: req.body.userId }).select([
            "userId",
            "notify",
            "_id",
        ]);
        if (notify.length > 0) {
            return res.json({status: true, notify})
        }
        else return res.json({status: false, msg: "Invalid ID"})
    } catch (ex) {
      next(ex);
    }
  };