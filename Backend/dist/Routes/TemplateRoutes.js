"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const TemplateCotroller_1 = require("../controllers/TemplateCotroller");
router.get("/get_all_template", TemplateCotroller_1.get_all_template_controller);
router.post("/select_template/:userId/:email", TemplateCotroller_1.add_template_controller);
exports.default = router;
