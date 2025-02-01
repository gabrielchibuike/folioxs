import { Request, Response } from "express";
import {
  create_user_service,
  find_user,
  get_user_email_service,
  getUser_info_service,
  login_user_service,
  validate_userName_service,
  verify_otp_service,
} from "../services/UserService";
import { createAccSchema, emailSchema } from "../middlewares/validation";
import jwt from "jsonwebtoken";
import sha1 from "sha1";
import dotenv from "dotenv";
import { UsersType } from "../Interface/UserTypes";
import { cloud_upload } from "../config/GeneralConfig";
import { generateOtpEmail } from "../utils/generateOtpEmail";

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_PRIVATE_KEY;

export async function create_user_controller(req: Request, res: Response) {
  const { email, password }: UsersType = req.body;

  try {
    const hashedPassword = sha1(password);
    const { error } = createAccSchema.validate({
      email,
      password,
    });
    if (error)
      return res.status(401).send(error.details.map((err) => err.message));

    const existing_user = await find_user(email);

    if (existing_user)
      return res.status(409).send("User already exist on database");

    const user_id = await create_user_service(email, hashedPassword);

    const accessToken = jwt.sign(
      { id: user_id._id, email: email },
      ACCESS_TOKEN as string
    );

    res.status(200).send(accessToken);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
}

export async function getUser_info_controller(req: Request, res: Response) {
  try {
    if (!req.file) return res.status(404).send("File not recieved");
    const { filename } = req.file!;

    // const result = await cloud_upload.uploader.upload(req.file!.path, {
    //   folder: `${filename.split(".")[0]}`,
    //   public_id: filename.split(".")[0],
    // });
    // console.log(result);

    const {
      id,
      email,
      title,
      bio,
      socialHandle,
      userName,
      selected_template,
    }: UsersType = JSON.parse(req.body.jsonData);

    console.log(req.body.jsonData);
    await getUser_info_service({
      id,
      filename,
      title,
      bio,
      socialHandle,
      userName,
      selected_template,
    });

    await generateOtpEmail(res, id, email);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function validate_userName_controller(
  req: Request,
  res: Response
) {
  try {
    const { userName }: { userName: string } = req.body;

    const data = await validate_userName_service(userName);
    if (data) return res.status(300).send(userName + "is taken");

    res.status(200).send("success!!");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function verify_otp_controller(req: Request, res: Response) {
  try {
    const { otp }: UsersType = req.body;

    await verify_otp_service(otp);

    res.status(200).send("success!!");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function login_user_controller(req: Request, res: Response) {
  const { email, password }: UsersType = req.body;

  const hashedPassword = sha1(password);
  try {
    const user = await login_user_service(email, hashedPassword);

    console.log(user?._id);

    if (user == null)
      return res.status(401).send("Incorrect  email or password");

    const accessToken = jwt.sign(
      { id: user?._id, email: email },
      ACCESS_TOKEN as string,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).send(accessToken);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// export async function get_user_email_controller(req: Request, res: Response) {
//   try {
//     const { email }: UsersType = req.body;

//     const { error } = emailSchema.validate(req.body);

//     if (error) return res.status(401).send(error.details[0]!.message);

//     const user = await get_user_email_service(email);

//     if (!user) return res.status(400).json({ message: "User not found" });

//     await generateOtpEmail(res, email);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }
