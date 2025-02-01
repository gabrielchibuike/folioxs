"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const UserController_1 = require("../controllers/UserController");
const uploadFunc_1 = require("../utils/uploadFunc");
const verifyJwt_1 = require("../utils/verifyJwt");
router.post("/access/create_user", UserController_1.create_user_controller);
router.post("/access/login", UserController_1.login_user_controller);
router.post("/access/get_started", uploadFunc_1.upload.single("file"), UserController_1.getUser_info_controller);
router.post("/access/get_user_email", UserController_1.get_user_email_controller);
router.post("/access/verify_otp", verifyJwt_1.verifyToken, UserController_1.verify_otp_controller);
exports.default = router;
