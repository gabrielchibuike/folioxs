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
exports.create_user_service = create_user_service;
exports.getUser_info_service = getUser_info_service;
exports.login_user_service = login_user_service;
exports.get_user_email_service = get_user_email_service;
exports.verify_otp_service = verify_otp_service;
exports.find_user = find_user;
const UserModel_1 = __importDefault(require("../model/UserModel"));
function create_user_service(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserModel_1.default.create({
            email,
            password,
        });
        return result;
    });
}
function getUser_info_service(id, profileImg, profileName, bio, socailHandle) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserModel_1.default.findOneAndUpdate({ _id: id }, { profileName, bio, profileImg, socailHandle }, { new: true });
        return result;
    });
}
function login_user_service(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserModel_1.default.findOne({
            email,
            password,
        });
        return result;
    });
}
function get_user_email_service(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExisting = yield UserModel_1.default.findOne({
            email,
        });
        return isExisting;
    });
}
function verify_otp_service(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserModel_1.default.findOneAndUpdate({ otp: otp }, { verified: "yes" }, { new: true });
        return result;
    });
}
function find_user(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield UserModel_1.default.findOne({ email });
        return result;
    });
}
