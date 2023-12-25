const router = require("express").Router()
const {
    fetch_service,
    add_service,
    fetch_user_services,
    updateService,
    deleteservice,
    search_services,
} = require("../handlers/serviceHandler")

const {verifyToken} = require("../middlewares/verify")

router.get("/", verifyToken, fetch_service)
router.post("/add_services", verifyToken, add_service)
router.get("/user_services", verifyToken, fetch_user_services)
router.put("/update_service", verifyToken, updateService)
router.delete("/delete_service", verifyToken, deleteservice)
router.post("/search_services", verifyToken, search_services)

module.exports = router