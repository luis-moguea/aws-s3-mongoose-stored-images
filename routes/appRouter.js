const express = require("express")
const upload = require("../utils/multer")
const controller = require("../controllers/appController.js")


const router = express.Router()

router.get("/api/get-images", controller.getImages)
router.post("/api/upload-image", upload.single("image"), controller.postImage)


module.exports = router