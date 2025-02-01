"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    profileName: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: { type: String },
    password: {
        type: String,
        required: true,
    },
    profileImg: { type: String },
    socailHandle: { type: [] },
    otp: { type: String },
    selected_template: { type: [] },
    verified: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    dateUpdated: { type: Date, default: Date.now() },
    visible: { type: Boolean, default: true },
});
const UserDetails = mongoose_1.default.model("personal_info", UserSchema);
exports.default = UserDetails;
