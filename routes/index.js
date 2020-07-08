const express = require("express");
const router = express.Router();
const {
  getAllBiz,
  getSingleBiz,
  addNewBiz,
  updateBiz,
  deleteBiz,
} = require("../controller/business");
// const validateId = require('../middleware/validateId');
const { userSignup, userLogin } = require("../controller/user");

// Biz Routes
router.get("/api/v1/biz", getAllBiz);
router.get("/api/v1/biz/:id", getSingleBiz);
router.post("/api/v1/biz", addNewBiz);
router.put("/api/v1/biz/:id", updateBiz);
router.delete("/api/v1/biz/:id", deleteBiz);

// Users Routes
router.post("/api/v1/user/signup", userSignup);
router.post("/api/v1/user/login", userLogin);

module.exports = router;
