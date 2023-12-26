const router = require("express").Router();

const {fetch_service_credentials, add_credentials, deletecredential} = require("../handlers/credentialHandler")
const {verifyToken} = require("../middlewares/verify")

router.get("/", fetch_service_credentials)
router.post("/add_credentials",  add_credentials)
router.delete("/deletecredential", verifyToken, deletecredential)

module.exports = router