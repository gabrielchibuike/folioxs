import { Response } from "express";
import { generateOtp } from "./generateOtp";
import jwt from "jsonwebtoken";
import UserDetails from "../model/UserModel";

export const generateOtpEmail = async (
  res: Response,
  id: string,
  email: string
) => {
  try {
    const otpcode = await generateOtp();

    const token = jwt.sign(
      { id: id, email: email },
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
      { expiresIn: "4m" }
    );

    const result = await UserDetails.findOneAndUpdate(
      { email: email },
      { otp: otpcode },
      { new: true }
    );

    res.status(200).send(token);

    //    const transporter = nodemailer.createTransport({
    //      service: "gmail",
    //      auth: {
    //        user: "gabrielnwagu2002@gmail.com",
    //        pass: "joaayblzmjukvrmp",
    //      },
    //    });
    //    const mailOptions = {
    //      from: "gabriel2002@gmail.com",
    //      to: "gabrielnwagu2002@gmail.com",
    //      subject: "verify Email",
    //      html: `<h3>Your Verification Code is${otpcode} </h3>`,
    //    };
    //    transporter.sendMail(mailOptions, (err, info) => {
    //      if (err) {
    //        console.log(err);
    //      } else {
    //        console.log(info);
    //      }
    //    });
  } catch (error: any) {
    res.status(500).send(error);
    console.log(error);
  }
};
