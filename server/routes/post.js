const { createPost, getAllPosts, likePost, removeLikePost, getAllUserPosts, commentPost, sharePost } = require("../controllers/postsController");
const { uploadImages } = require("../controllers/userController");
const { uploadMiddleware } = require("../middlewares/fileUpload.middlewares");

const router = require("express").Router();

router.route("/create").post(createPost);
router.post("/upload", uploadMiddleware, uploadImages);
router.get("/getall", getAllPosts);
router.post("/likepost", likePost)
router.post("/removelike", removeLikePost)
router.post("/getuserposts", getAllUserPosts)
router.post("/commentpost", commentPost)
router.post("/sharepost", sharePost)

module.exports = router;