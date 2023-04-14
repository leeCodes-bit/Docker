"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.getUserAndReport = exports.Login = exports.Signup = void 0;
const doctorsModel_1 = require("../model/doctorsModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const reportModel_1 = require("../model/reportModel");
const jwtsecret = process.env.JWT_SECRET;
/* ======================================= User API ========================= */
// export const Signup = async (req: Request, res: Response) => {
//     // res.status(200).json({msg: "Hello world"});
//     try{
//         const { doctorsName, email, specialization, gender, phoneNumber, password } = req.body
//         const doctorid = UUIDV4()
//         // validate with joi or zod
//         const validationResult = signupSchema.validate(req.body, options);
//         if(validationResult.error){
//             return res.status(400).json({Error: validationResult.error.details[0].message})
//         }
//         // hash password
//         const passwordHash = await bcrypt.hash(password, 8)
//         // create user
//         // - check if user exists
//         const user = await DoctorInstance.findOne({
//             // where: {email: req.body.email} if we didn't destructure in line 7 above
//             where: {email: email}
//         })
//         if(!user){
//           let newUser =  await DoctorInstance.create({
//                 id: doctorid,
//                 doctorsName,
//                 email,
//                 specialization,
//                 gender,
//                 phoneNumber,
//                 password: passwordHash
//             })
//         // generate token for doctors
//         interface IKey {
//             [key: string]: string
//         }
//         const Doctor = await DoctorInstance.findOne({
//             where: {email: email}
//         }) as unknown as IKey
//         const { id } = Doctor
//         const token = jwt.sign({id}, jwtsecret,{expiresIn: "30mins"})
//         // res.cookie('token', token, {httpOnly: true, maxAge: 30*60*1000})
//         // send otps
//         //send email
//         interface Data{
//             doctorsName: string;
//             email: string; // no duplicates allowed.
//             specialization: string;
//             gender: string;
//             phoneNumber: string;
//         }
//         return res.status(201).json({
//             msg: "user created sucessfully",
//             newUser,
//             token
//         })
//         } else{
//             res.status(409).json({
//                 msg: "Email already taken"
//             })
//         } 
//     }catch(err){
//         console.log(err);
//         res.status(500).json({Error: "Internal server error"})
//     }
//   }
//   export const Login = async(req: Request, res: Response) => {
//     try{
//         const { email, password } = req.body
//         // validate with joi or zod
//         const validationResult = loginSchema.validate(req.body, options);
//         if(validationResult.error){
//             return res.status(400).json({Error: validationResult.error.details[0].message})
//         }
//          // generate token for doctors
//         const Doctor = await DoctorInstance.findOne({
//             where: {email: email}
//         }) as unknown as { [key: string]: string}
//         const { id } = Doctor
//         const token = jwt.sign({id}, jwtsecret,{expiresIn: "30days"});
//         // res.cookie('token', token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
//         const validUser = await bcrypt.compare(password, Doctor.password)
//         if(validUser){
//             return res.status(201).json({
//                 msg: "you have sucessfully logged in",
//                 Doctor,
//                 token
//             })
//         }
//         return res.status(400).json({Error: 'invalid email/password'})
//     }catch(err){
//         console.log(err);
//         // res.status(500).json({Error: "Internal server error"})
//     }
//   }
//   export const getUserAndReport = async (req: Request, res: Response) =>{
//     try{
//         // sequelize findAll or findAndCountAll
//         // const getAllReports = await ReportInstance.findAll();
//         const getAllUsers = await DoctorInstance.findAndCountAll({
//             include: [
//                 {
//                     model: ReportInstance,
//                     as: "Reports"
//                 }
//             ]
//         });
//         return res.status(200).json({
//             msg: "You have successfully retrieved all data",
//             count: getAllUsers.count,
//             doctor: getAllUsers.rows
//         })
//       }catch(err){
//         console.log(err);
//       }
//   }
/*================================EJS API============================== */
const Signup = async (req, res) => {
    try {
        const { doctorsName, email, specialization, gender, phoneNumber, password } = req.body;
        const doctorsId = (0, uuid_1.v4)();
        // validate with joi or zod
        const validationResult = utils_1.signupSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Signup", { error: validationResult.error.details[0].message });
        }
        // hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        // create user
        // - check if user exists
        const user = await doctorsModel_1.DoctorInstance.findOne({
            // where: {email: req.body.email} if we didn't destructure in line 7 above
            where: { email: email }
        });
        if (!user) {
            let newUser = await doctorsModel_1.DoctorInstance.create({
                doctorsId: doctorsId,
                doctorsName,
                email,
                specialization,
                gender,
                phoneNumber,
                password: passwordHash
            });
            const Doctor = await doctorsModel_1.DoctorInstance.findOne({
                where: { email: email }
            });
            const { id } = Doctor;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            //  res.cookie('token', token, {httpOnly: true, maxAge: 30*60*1000})
            // send otps
            //send email
            res.redirect("/login");
        }
        res.render("Signup", { error: "Email is already taken" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Signup = Signup;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate with joi or zod
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Login", { error: validationResult.error.details[0].message });
        }
        // generate token for doctors
        const Doctor = await doctorsModel_1.DoctorInstance.findOne({
            where: { email: email }
        });
        const { doctorsId } = Doctor;
        const token = jsonwebtoken_1.default.sign({ doctorsId }, jwtsecret, { expiresIn: "30days" });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, Doctor.password);
        if (validUser) {
            return res.redirect('/dashboard');
        }
        res.render("Login", { error: "Invalid email/password" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Login = Login;
const getUserAndReport = async (req, res) => {
    try {
        // sequelize findAll or findAndCountAll
        // const getAllReports = await ReportInstance.findAll();
        const getAllUsers = await doctorsModel_1.DoctorInstance.findAndCountAll({
            include: [
                {
                    model: reportModel_1.ReportInstance,
                    as: "Reports"
                }
            ]
        });
        return res.status(200).json({
            msg: "You have successfully retrieved all data",
            count: getAllUsers.count,
            doctor: getAllUsers.rows
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getUserAndReport = getUserAndReport;
const Logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};
exports.Logout = Logout;
