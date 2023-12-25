const router = require("express").Router();
const {
    fetch_users,
    fetch_user_by_id,
    register_user,
    login_user,
    verify_email,
    resend_otp,
    upload_profile_image,
    updateUserInfo,
    deleteUser

} = require("../handlers/userHandler")

const {verifyToken}  = require("../middlewares/verify")

router.get("/", verifyToken, fetch_users);
router.get("/:id", verifyToken, fetch_user_by_id);
router.post("/register", register_user);
router.post("/login", login_user);
router.post("/verify", verify_email);
router.post("/resend-otp", resend_otp);
router.post("/upload-profile-image",verifyToken, upload_profile_image);
router.put("/update-user-info",verifyToken, updateUserInfo);
router.delete("/delete-user",verifyToken, deleteUser);

module.exports = router