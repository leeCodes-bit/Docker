import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { DoctorInstance } from "../model/doctorsModel";
import { ReportInstance } from "../model/reportModel";
import { createReportSchema, options, updateReportSchema } from "../utils/utils";

/*=======================API=============================== */
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

export const getReports =async (req:Request, res: Response) => {
  try{
    const limit = req.query?.limit as number | undefined
    const offset = req.query?.offset as number | undefined

    const getAllReports = await ReportInstance.findAndCountAll({
        limit: limit,
        offset: offset
    });

    return res.status(200).json({
        msg: "You have successfully retrieved all reports",
        count:  getAllReports.count,
        getAllReports: getAllReports.rows
    })
  }catch(error){
    console.log(error);
  }
}


export const updateReport = async (req:Request, res: Response) => {
    try{
    const validationResult = updateReportSchema.validate(req.body, options);
    if(validationResult.error){
        return res.status(400).json({Error: validationResult.error.details[0].message})
    };

    const {patientId} =  req.params
    const { 
      patientName,
      age,
      hospitalName,
      weight,
      height,
      bloodGroup,
      genotype,
      bloodPressure,
      HIV_status,
      hepatitis, } = req.body;

    const updateReport = await ReportInstance.findOne({where: {patientId}})

    if(!updateReport){
        return res.status(400).json({
            error: "cannot find existing todo"
        })
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

    }catch(error){
        console.log(error);
    }
}

export const deleteReport = async(req: Request, res: Response)=>{
try{
    const {patientId} = req.params
    const report = await ReportInstance.findOne({where: {patientId}})
    
    if(!report){
        return res.status(400).json({
            error: "cannot find existing report"
        })
    }

    const deletedReport = await report.destroy()

    return res.status(200).json({
        message: "Patient report successfully deleted",
        report: deletedReport
      });
}catch(error){
    console.log(error);
}
}


/*======================EJS API===================== */
export const CreateReport =async(req:Request | any, res: Response) => {
    try{
    const validationResult = createReportSchema.validate(req.body, options);
    if(validationResult.error){
        return res.render("CreateReport", {error: validationResult.error.details[0].message})
    };

    const verified = req.user

    const patientId = uuidv4();
    
    const reportRecord = await ReportInstance.create({
        patientId,
        ...req.body,
        doctorsId : verified.doctorsId
    });

    return res.redirect("/dashboard")

    }catch(err){
        console.log(err);
    }
}

export const getReportsById =async (req:Request | any, res: Response) => {
    try{
        const {id} = req.user
        const {report} = await DoctorInstance.findOne({where: {doctorsId:id}, include: {
            model: ReportInstance,
            as: "Reports"
        }}) as unknown as any

        return res.render('Dashboard', {
            reports: report
        })
    }catch(error){
      console.log(error);
    }
  }
  
