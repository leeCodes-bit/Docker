"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportsController_1 = require("../controller/reportsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* Create report. */
router.post('/create', auth_1.auth, reportsController_1.CreateReport);
router.get('/get-reports', auth_1.auth, reportsController_1.getReports);
router.patch('/update-reports/:patientId', auth_1.auth, reportsController_1.updateReport);
// router.delete('/delete-reports/:patientId', auth, deleteReport);
exports.default = router;
