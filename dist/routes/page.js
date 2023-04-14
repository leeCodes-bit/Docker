"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const doctorsModel_1 = require("../model/doctorsModel");
const reportModel_1 = require("../model/reportModel");
const router = express_1.default.Router();
// pages
router.get('/', (req, res, next) => {
    res.render('Signup');
});
router.get('/login', (req, res, next) => {
    res.render('Login');
});
// router.get('/dashboard', auth, (req: Request, res: Response, next: NextFunction) => {
//     res.render('Dashboard')
// })
router.get('/create', auth_1.auth, async (req, res, next) => {
    res.render('CreateReport');
});
// get report and render on dashboard
router.get('/dashboard', auth_1.auth, async (req, res) => {
    try {
        const id = req.user.doctorsId;
        const { Reports } = await doctorsModel_1.DoctorInstance.findOne({ where: { doctorsId: id }, include: [{
                    model: reportModel_1.ReportInstance,
                    as: "Reports"
                }] });
        return res.render("Dashboard", {
            reports: Reports
        });
    }
    catch (error) {
        console.log(error);
    }
});
//   delete report
router.get('/dashboard/:id', auth_1.auth, async (req, res) => {
    try {
        const patientId = req.params.id;
        const report = await reportModel_1.ReportInstance.findOne({ where: { patientId } });
        if (!report) {
            return res.render('Dashboard', { error: "Cannot find existing report" });
        }
        await report.destroy();
        return res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
