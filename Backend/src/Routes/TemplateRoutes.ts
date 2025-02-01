const express = require("express");

const router = express.Router();

import {
  create_project_controller,
  delete_project_controller,
  edit_project_controller,
  get_all_template_controller,
  get_user_template_controller,
  select_template_controller,
} from "../controllers/TemplateCotroller";

import { upload } from "../utils/uploadFunc";
import { verifyToken } from "../utils/verifyJwt";

router.get("/get_all_template", verifyToken, get_all_template_controller);

router.post(
  "/select_template/:userId/:email",
  verifyToken,
  select_template_controller
);

router.get("/user_template/:userId", verifyToken, get_user_template_controller);

router.post("/create_project", verifyToken, create_project_controller);

router.post(
  "/edit_project",
  verifyToken,
  upload.single("file"),
  edit_project_controller
);

router.post("/remove_project", verifyToken, delete_project_controller);

export default router;
