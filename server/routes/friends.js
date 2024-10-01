const { createData, addFriendList, addRequestList, getFriendData } = require("../controllers/friendsController");

const router = require("express").Router();

router.post("/createData", createData);
router.post("/addFriendList", addFriendList)
router.post("/addRequestList", addRequestList)
router.get("/getFriendData/:id", getFriendData)

module.exports = router;