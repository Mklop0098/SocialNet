const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getUsers,
  setBackgroundImage,
  setAvatarImage
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/user/:id", getUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.post("/setbgimage", setBackgroundImage)
router.post("/setavatar", setAvatarImage)

module.exports = router;
