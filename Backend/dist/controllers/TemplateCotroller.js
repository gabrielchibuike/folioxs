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
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_template_controller = get_all_template_controller;
exports.add_template_controller = add_template_controller;
const TemplateService_1 = require("../services/TemplateService");
function get_all_template_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const get_template = yield (0, TemplateService_1.get_all_template_service)();
        console.log(get_template);
        if (get_template.length > 0)
            return res.send(get_template);
    });
}
function add_template_controller(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, email } = req.params;
        console.log(userId, email);
        const value = req.body;
        const data = yield (0, TemplateService_1.add_template_service)(userId, email, value);
        console.log(data);
        //   if (data.length > 0) return res.send("");
    });
}
