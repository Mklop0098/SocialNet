const { createNotify, getAllNotifies, readNotifies } = require("../controllers/notifyController");

const router = require("express").Router();

router.post("/create", createNotify);
router.get("/notifies/:id", getAllNotifies);
router.post("/notifies", readNotifies);

module.exports = router;