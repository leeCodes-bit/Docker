"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportsById = exports.CreateReport = exports.updateReport = exports.getReports = void 0;
const uuid_1 = require("uuid");
const doctorsModel_1 = require("../model/doctorsModel");
const reportModel_1 = require("../model/reportModel");
const utils_1 = require("../utils/utils");
/*=======================API */
// export const CreateReport = async(req:Request | any, res: Response) => {
//     try{
//         // validate with joi or zod
//         const validationResult = createReportSchema.validate(req.body, options);
//         if(validationResult.error){
//             return res.status(400).json({Error: validationResult.error.details[0].message})
//         };
//         const verified = req.user
//         const patientId = uuidv4();
//         const reportRecord = await ReportInstance.create({
//             patientId,
//             ...req.body,
//             doctorsId : verified.id
//         });
//         return res.status(201).json({
//             msg: 'you have sucessfully created a report',
//             reportRecord
//         });
//         }catch(err){
//             console.log(err);
//         }
// }
const getReports = async (req, res) => {
    try {
        // /report/get-report?limit=3&offset=1 - query params
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        // sequelize findAll or findAndCountAll
        // const getAllReports = await ReportInstance.findAll();
        const getAllReports = await reportModel_1.ReportInstance.findAndCountAll({
            limit: limit,
            offset: offset
        });
        return res.status(200).json({
            msg: "You have successfully retrieved all reports",
            count: getAllReports.count,
            getAllReports: getAllReports.rows
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getReports = getReports;
const updateReport = async (req, res) => {
    try {
        // validate with joi or zod
        const validationResult = utils_1.updateReportSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        ;
        // report/update-report/id - this is params
        const { patientId } = req.params;
        const { patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis, } = req.body;
        const updateReport = await reportModel_1.ReportInstance.findOne({ where: { patientId } });
        if (!updateReport) {
            return res.status(400).json({
                error: "cannot find existing todo"
            });
        }
        const updatedReport = await updateReport.update({
            patientName: patientName,
            age: age,
            hospitalName: hospitalName,
            weight: weight,
            height: height,
            bloodGroup: bloodGroup,
            genotype: genotype,
            bloodPressure: bloodPressure,
            HIV_status: HIV_status,
            hepatitis: hepatitis,
        });
        return res.status(200).json({
            message: "Patient report successfully updated",
            report: updatedReport
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateReport = updateReport;
// export const deleteReport = async(req: Request, res: Response)=>{
// try{
//     const {patientId} = req.params
//     const report = await ReportInstance.findOne({where: {patientId}})
//     if(!report){
//         return res.status(400).json({
//             error: "cannot find existing report"
//         })
//     }
//     const deletedReport = await report.destroy()
//     return res.status(200).json({
//         message: "Patient report successfully deleted",
//         report: deletedReport
//       });
// }catch(error){
//     console.log(error);
// }
// }
/*======================EJS API===================== */
const CreateReport = async (req, res) => {
    try {
        // validate with joi or zod
        const validationResult = utils_1.createReportSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("CreateReport", { error: validationResult.error.details[0].message });
        }
        ;
        const verified = req.user;
        const patientId = (0, uuid_1.v4)();
        const reportRecord = await reportModel_1.ReportInstance.create({
            patientId,
            ...req.body,
            doctorsId: verified.doctorsId
        });
        return res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
    }
};
exports.CreateReport = CreateReport;
// get report by id
const getReportsById = async (req, res) => {
    try {
        const { id } = req.user;
        const { report } = await doctorsModel_1.DoctorInstance.findOne({ where: { doctorsId: id }, include: {
                model: reportModel_1.ReportInstance,
                as: "Reports"
            } });
        return res.render('Dashboard', {
            reports: report
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getReportsById = getReportsById;
