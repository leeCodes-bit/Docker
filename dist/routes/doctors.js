"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const doctorsController_1 = require("../controller/doctorsController");
router.post('/signup', doctorsController_1.Signup);
router.post('/login', doctorsController_1.Login);
router.get('/get-report', doctorsController_1.getUserAndReport);
router.get('/logout', doctorsController_1.Logout);
exports.default = router;
