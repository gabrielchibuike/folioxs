"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TemplateSchema = new mongoose_1.default.Schema({
    profilePictureUrl: { type: String },
    profileName: { type: String },
    bio: { type: String },
    socailHandle: { type: [] },
    links: { type: [] },
    supportDetails: { type: [] },
    dateCreated: { type: Date, default: Date.now() },
    dateUpdated: { type: Date, default: Date.now() },
    visible: { type: Boolean, default: true },
});
const TemplateDetails = mongoose_1.default.model("templates", TemplateSchema);
exports.default = TemplateDetails;
