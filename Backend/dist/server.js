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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoute_1 = __importDefault(require("./Routes/UserRoute"));
const TemplateRoutes_1 = __importDefault(require("./Routes/TemplateRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// connetion to database
mongoose_1.default
    .connect(process.env.DB_CONNECTION || "mongodb://localhost:27017/foliox")
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    });
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("src/uploads"));
app.use("/api", UserRoute_1.default);
app.use("/api", TemplateRoutes_1.default);
// app.post("/", async (req, res) => {
//   const { profilePictureUrl, profileName, bio, links, supportDetails } =
//     req.body;
//     const create_template = Templates.create({
//       profilePictureUrl,
//       profileName,
//       bio,
//       links,
//       supportDetails,
//     });
// });
// app.get("/temp", async (req, res) => {
//   const get_template = await Templates.find();
//   console.log(get_template);
//   if (get_template.length > 0) return res.send(get_template);
// });
app.listen(process.env.PORT || 5000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("server is running on port " + process.env.PORT);
    }
    catch (err) {
        console.log(err);
    }
}));
