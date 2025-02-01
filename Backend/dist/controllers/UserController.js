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
exports.create_user_controller = create_user_controller;
exports.login_user_controller = login_user_controller;
exports.getUser_info_controller = getUser_info_controller;
exports.get_user_email_controller = get_user_email_controller;
exports.verify_otp_controller = verify_otp_controller;
const UserService_1 = require("../services/UserService");
const validation_1 = require("../middlewares/validation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sha1_1 = __importDefault(require("sha1"));
const dotenv_1 = __importDefault(require("dotenv"));
const generateOtpEmail_1 = require("../utils/generateOtpEmail");
dotenv_1.default.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_PRIVATE_KEY;
function create_user_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const hashedPassword = (0, sha1_1.default)(password);
            const { error } = validation_1.createAccSchema.validate({
                email,
                password,
            });
            if (error)
                return res.status(401).send(error.details.map((err) => err.message));
            const existing_user = yield (0, UserService_1.find_user)(email);
            if (existing_user)
                return res.status(409).send("User already exist on database");
            const user_id = yield (0, UserService_1.create_user_service)(email, hashedPassword);
            const accessToken = jsonwebtoken_1.default.sign({ id: user_id._id, email: email }, ACCESS_TOKEN);
            res.status(200).send(accessToken);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    });
}
function login_user_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const hashedPassword = (0, sha1_1.default)(password);
        try {
            const user = yield (0, UserService_1.login_user_service)(email, hashedPassword);
            if (user == null)
                return res.status(401).send("Incorrect  email or password");
            const accessToken = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id, email: email }, ACCESS_TOKEN, {
                expiresIn: "15s",
            });
            return res.status(200).send(accessToken);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getUser_info_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.file)
                return res.status(404).send("File not recieved");
            const { filename } = req.file;
            // const result = await cloud_upload.uploader.upload(req.file!.path, {
            //   folder: `${filename.split(".")[0]}`,
            //   public_id: filename.split(".")[0],
            // });
            // console.log(result);
            const { id, email, title, bio, socialHandle } = JSON.parse(req.body.jsonData);
            console.log(id, email);
            yield (0, UserService_1.getUser_info_service)(id, filename, title, bio, socialHandle);
            yield (0, generateOtpEmail_1.generateOtpEmail)(res, email);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function get_user_email_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const { error } = validation_1.emailSchema.validate(req.body);
            if (error)
                return res.status(401).send(error.details[0].message);
            const user = yield (0, UserService_1.get_user_email_service)(email);
            if (!user)
                return res.status(400).json({ message: "User not found" });
            yield (0, generateOtpEmail_1.generateOtpEmail)(res, email);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function verify_otp_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { otp } = req.body;
            yield (0, UserService_1.verify_otp_service)(otp);
            res.status(200).send("success!!");
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
