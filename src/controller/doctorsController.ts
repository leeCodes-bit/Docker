import { Request, Response } from "express";
import { DoctorInstance } from "../model/doctorsModel";
import {v4 as UUIDV4} from 'uuid'
import { signupSchema, options, loginSchema } from "../utils/utils";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ReportInstance } from "../model/reportModel";

const jwtsecret = process.env.JWT_SECRET as string;

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
//                 doctorsId: doctorid,
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

export const Signup = async (req: Request, res: Response) => {
    try{
        const { doctorsName, email, specialization, gender, phoneNumber, password } = req.body
        const doctorsId = UUIDV4()
        
        const validationResult = signupSchema.validate(req.body, options);
        if(validationResult.error){
            return res.render("Signup", {error: validationResult.error.details[0].message})
        }

        const passwordHash = await bcrypt.hash(password, 8)

        const user = await DoctorInstance.findOne({
            where: {email: email}
        })
        if(!user){
          let newUser =  await DoctorInstance.create({
                doctorsId: doctorsId,
                doctorsName,
                email,
                specialization,
                gender,
                phoneNumber,
                password: passwordHash
            })

        interface IKey {
            [key: string]: string
        }
        const Doctor = await DoctorInstance.findOne({
            where: {email: email}
        }) as unknown as IKey

        const { id } = Doctor

        const token = jwt.sign({id}, jwtsecret,{expiresIn: "30mins"})

        res.redirect("/login")
        }

        res.render("Signup", {error: "Email is already taken"})
        
    }catch(err){
        console.log(err);
    }
  }

  export const Login = async(req: Request, res: Response) => {
    try{
        const { email, password } = req.body

        const validationResult = loginSchema.validate(req.body, options);

        if(validationResult.error){
            return res.render("Login", {error: validationResult.error.details[0].message})
        }

        const Doctor = await DoctorInstance.findOne({
            where: {email: email}
        }) as unknown as { [key: string]: string}


        const { doctorsId } = Doctor
        const token = jwt.sign({doctorsId}, jwtsecret,{expiresIn: "30days"});

        res.cookie('token', token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});

        const validUser = await bcrypt.compare(password, Doctor.password)

        if(validUser){
            return res.redirect('/dashboard')
        }
        res.render("Login", {error: "Invalid email/password"})

    }catch(err){
        console.log(err);
    }
  }


  export const getUserAndReport = async (req: Request, res: Response) =>{
    try{
        const getAllUsers = await DoctorInstance.findAndCountAll({
            include: [
                {
                    model: ReportInstance,
                    as: "Reports"
                }
            ]
        });
    
        return res.status(200).json({
            msg: "You have successfully retrieved all data",
            count: getAllUsers.count,
            doctor: getAllUsers.rows
        })
   
      }catch(err){
        console.log(err);
      }
  }

  export const Logout =async (req: Request, res: Response) => {
    res.clearCookie("token")
    res.redirect("/login")
  }