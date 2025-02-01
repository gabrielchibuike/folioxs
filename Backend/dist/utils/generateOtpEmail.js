"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpEmail = void 0;
const generateOtp_1 = require("./generateOtp");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const generateOtpEmail = (res, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpcode = yield (0, generateOtp_1.generateOtp)();
        const token = jsonwebtoken_1.default.sign({ email: email }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "1hrs" });
        const result = yield UserModel_1.default.findOneAndUpdate({ email: email }, { otp: otpcode }, { new: true });
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
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});
exports.generateOtpEmail = generateOtpEmail;
