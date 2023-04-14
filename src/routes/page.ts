import express, {Request, Response, NextFunction} from 'express'
import { auth } from '../middleware/auth';
import { DoctorInstance } from '../model/doctorsModel';
import { ReportInstance } from '../model/reportModel';

const router = express.Router();

// pages
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('Signup')
});

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render('Login')
})

router.get('/create', auth, async (req: Request, res: Response, next: NextFunction) => {
    res.render('CreateReport')
})

// get report and render on dashboard
router.get('/dashboard', auth, async (req:Request | any, res: Response) => {
    try{
        const id= req.user.doctorsId
        
        const {Reports} = await DoctorInstance.findOne({where: {doctorsId:id}, include: [{
            model: ReportInstance,
            as: "Reports"
    }]}) as unknown as any

        return res.render("Dashboard", {
        reports:Reports
        })
       
    }catch(error){
      console.log(error);
    }
  })

//   Update report
router.get('/update/:id', auth, async (req: Request, res: Response) => {
    try {
        const patientId = req.params.id

        const report = await ReportInstance.findOne({where: {patientId}})
        
        if(!report){
            return res.render('Dashboard', {error: "Cannot find existing report"})
        }

        return res.render("Update",{
            title: "edit patient",
            report: report
        })
    } catch (error) {
        console.log(error)
    }
})

router.post("/editReport/:id",async (req: Request, res: Response) => {
    const patientId = req.params.id

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

    const report = await ReportInstance.findOne({where: {patientId}})
   const UpdatedReport = report?.update({
    patientName,
    age,
    hospitalName,
    weight,
    height,
    bloodGroup,
    genotype,
    bloodPressure,
    HIV_status,
    hepatitis,
   });
    return res.redirect("/dashboard")
});

//   delete report
router.get('/dashboard/:id', auth, async(req: Request, res: Response)=>{
    try{
        
        const patientId = req.params.id
    
        const report = await ReportInstance.findOne({where: {patientId}})
        
        if(!report){
            return res.render('Dashboard', {error: "Cannot find existing report"})
        }
        await report.destroy()
    
        return res.redirect('/dashboard')
    }catch(error){
        console.log(error);
    }
    });

export default router

