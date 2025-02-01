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
exports.get_all_template_service = get_all_template_service;
exports.add_template_service = add_template_service;
const Templates_1 = __importDefault(require("../model/Templates"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
function get_all_template_service() {
    return __awaiter(this, void 0, void 0, function* () {
        const get_template = yield Templates_1.default.find();
        return get_template;
    });
}
function add_template_service(userId, email, userTemplateUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, profilePictureUrl, profileName, bio, socialHandle, links, supportDetails, templateImage, } = userTemplateUpdate;
        console.log(userTemplateUpdate);
        const result = yield UserModel_1.default.findOneAndUpdate({
            $or: [{ _id: userId }, { email: email }],
        }, {
            selected_template: [
                {
                    id,
                    profilePictureUrl,
                    profileName,
                    bio,
                    socialHandle,
                    links,
                    supportDetails,
                    templateImage,
                },
            ],
        }, { new: true });
        return result;
    });
}
