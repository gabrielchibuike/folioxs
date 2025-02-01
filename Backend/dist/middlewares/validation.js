"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.emailSchema = exports.loginSchema = exports.createAccSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
exports.createAccSchema = joi_1.default.object({
    // firstName: Joi.string().required().trim().messages({
    //   "string.empty": "This field is required",
    // }),
    // lastName: Joi.string().required().trim().messages({
    //   "string.empty": "This field is required",
    // }),
    email: joi_1.default.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .messages({
        "string.empty": "This field is required",
        "string.email": "email must be a valid email",
    }),
    password: (0, joi_password_complexity_1.default)({
        min: 6,
        max: 20,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 6,
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: ["com", "net"] } }),
    password: (0, joi_password_complexity_1.default)({
        min: 6,
        max: 20,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 6,
    }),
});
exports.emailSchema = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: ["com", "net"] } }),
});
exports.updateSchema = joi_1.default.object({
    password: (0, joi_password_complexity_1.default)({
        min: 6,
        max: 20,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 6,
    }),
    Cpassword: joi_1.default.string().valid(joi_1.default.ref("password")).required().messages({
        "any.only": "Retyped password must match the password",
    }),
});
