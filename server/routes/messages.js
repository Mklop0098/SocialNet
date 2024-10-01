const { addMessage, getMessages, getReceiveMessages } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/getreceive/", getReceiveMessages);

module.exports = router;
