import express, { Request, Response } from "express";

const router = express.Router();

import {
  create_user_controller,
  // get_user_email_controller,
  getUser_info_controller,
  login_user_controller,
  validate_userName_controller,
  verify_otp_controller,
} from "../controllers/UserController";
import { upload } from "../utils/uploadFunc";
import { verifyToken } from "../utils/verifyJwt";
import UserDetails from "../model/UserModel";

router.post("/access/create_user", create_user_controller);

// router.get(
//   "/access/uniqueDetail",
//   verifyToken,
//   async (req: Request, res: Response) => {
//     // @ts-ignore
//     const id = req.user;
//     try {
//       const result = await UserDetails.findOne({ _id: id });
//       console.log(result);

//       return res.status(200).send({ id: result?._id, email: result?.email });
//     } catch (err) {
//       res.status(200).send(err);
//     }
//   }
// );

router.post("/access/login", login_user_controller);

router.post(
  "/access/get_started",
  upload.single("file"),
  getUser_info_controller
);

// router.post("/access/get_user_email", get_user_email_controller);

router.post("/access/validateUserName", validate_userName_controller);

router.post("/access/verify_otp", verifyToken, verify_otp_controller);

export default router;
