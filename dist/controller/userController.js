"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = void 0;
const doctorsModel_1 = require("../model/doctorsModel");
const uuid_1 = require("uuid");
const Signup = async (req, res) => {
    // res.status(200).json({msg: "Hello world"});
    try {
        const { doctorsName, email, specialization, gender, phoneNumber, password } = req.body;
        const userid = (0, uuid_1.v4)();
        // validate with joi or zod
        // generate salt, bcos we need to verify the user with the sailt
        // create user
        // - check if user exists
        const user = await doctorsModel_1.UserInstance.findOne({
            // where: {email: req.body.email} if we didn't destructure in line 7 above
            where: { email: email }
        });
        if (!user) {
            let newUser = await doctorsModel_1.UserInstance.create({
                id: userid,
                doctorsName,
                email,
                specialization,
                gender,
                phoneNumber,
                password
            });
            // send otps
            // send email
            return res.status(201).json({
                msg: "user created sucessfully",
                newUser
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.Signup = Signup;
