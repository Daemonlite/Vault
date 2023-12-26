const router = require("express").Router();

const {
  fetch_service_credentials,
  add_credentials,
  deletecredential,
  fetch_service_credentials_by_type,
} = require("../handlers/credentialHandler");
const { verifyToken } = require("../middlewares/verify");

router.get("/", fetch_service_credentials);
router.get("/cred_type", fetch_service_credentials_by_type);
router.post("/add_credentials", add_credentials);
router.delete("/deletecredential", verifyToken, deletecredential);

module.exports = router;
