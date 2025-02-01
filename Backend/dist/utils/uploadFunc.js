"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path = require("path");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
        const origin = file.originalname.split(".")[0];
        const ext = path.extname(file.originalname);
        const newExt = origin + ext;
        const arrExt = [".png", ".jpg"];
        if (arrExt.includes(ext) == true) {
            cb(null, newExt);
        }
        else {
            console.log("not supported");
        }
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1048576 * 5,
    },
});
