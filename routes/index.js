const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const {
  getAllBiz,
  getSingleBiz,
  addNewBiz,
  updateBiz,
  deleteBiz,
} = require("../controller/business");

const {
  userSignup,
  allUsers,
  deleteUser,
  userLogin,
} = require("../controller/user");

// Biz Routes
router.get("/api/v1/biz", getAllBiz);
router.get("/api/v1/biz/:id", getSingleBiz);
router.post("/api/v1/biz", checkAuth, addNewBiz);
router.put("/api/v1/biz/:id", checkAuth, updateBiz);
router.delete("/api/v1/biz/:id", checkAuth, deleteBiz);

// Users Routes
router.post("/api/v1/user/signup", userSignup);
router.post("/api/v1/user/login", userLogin);
router.get("/api/v1/user", allUsers);
router.delete("/api/v1/user/:id", deleteUser);

module.exports = router;
