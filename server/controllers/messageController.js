const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender === from,
        message: msg.message.text,
      };
    });
    res.json({status: true, projectedMessages});
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    const data = await Messages.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
      receiver: to,
      readed: false,
      createAt: new Date()
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getReceiveMessages = async (req, res, next) => {
  try {
    const { to } = req.body;

    console.log(to)

    const receiver = await Messages.find({
      receiver: to
    }).sort({ updatedAt: 1 })

    const sender = await Messages.find({
      sender: to
    })
    const list = [...receiver, ...sender]
    const projectedMessages = list.map((msg) => {
      return {
        from: msg.sender,
        to: msg.receiver,
        readed: msg.readed,
        message: msg.message.text,
        createAt: msg.createAt
      };
    });
    res.json({status: true, projectedMessages});
  } catch (ex) {
    next(ex);
  }
};