"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doctorsModel_1 = require("../model/doctorsModel");
const jwtsecret = process.env.JWT_SECRET;
/*=====================API MIDDLEWARE==================== */
// export async function auth(req: Request | any, res: Response, next: NextFunction) {
//     try{
//         // using cookies for authorization
//         const authorization = req.cookies.token; 
//         // const authorization = req.headers.authorization;
//         if(!authorization){
//             return res.status(401).json({Error: "Kindly sign in as a user"})
//         }
//         // const token = authorization.slice(7, authorization.length)
//         // let verified = jwt.verify(token,  jwtsecret)
//         let verified = jwt.verify(authorization,  jwtsecret)
//         if(!verified){
//             return res.status(401).json({Error: "token invalid, you can't access this route"})
//         }
//         const {id} = verified as {[key: string]: string}
//         // find user by id - 
//         const user = await DoctorInstance.findOne({where: {id}})
//         if(!user){
//         res.status(401).json({error: "Kindly signin as a user"})
//         }
//         req.user = verified
//         next()
//     }catch(err){
//         res.status(401).json({error: "Your are not logged in"})
//     }
// }
/*===============================EJS API========================= */
async function auth(req, res, next) {
    try {
        // using cookies for authorization
        const authorization = req.cookies.token;
        // const authorization = req.headers.authorization;
        if (!authorization) {
            // return res.status(401).json({Error: "Kindly sign in as a user"})
            return res.redirect("/login");
        }
        // const token = authorization.slice(7, authorization.length)
        // let verified = jwt.verify(token,  jwtsecret)
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res.redirect("/login");
        }
        const { doctorsId } = verified;
        // find user by id - 
        const user = await doctorsModel_1.DoctorInstance.findOne({ where: { doctorsId } });
        if (!user) {
            return res.redirect("/login");
        }
        req.user = verified;
        next();
    }
    catch (err) {
        return res.redirect("/login");
    }
}
exports.auth = auth;
