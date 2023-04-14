"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReportSchema = exports.createReportSchema = exports.loginSchema = exports.options = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object().keys({
    doctorsName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    specialization: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    phoneNumber: joi_1.default.number().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    //confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({'any.only': '{{#label}} does not match'})
});
// to make error messages cleaner
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});
exports.createReportSchema = joi_1.default.object().keys({
    patientName: joi_1.default.string().lowercase().required(),
    age: joi_1.default.number().required(),
    hospitalName: joi_1.default.string().lowercase().required(),
    weight: joi_1.default.string().lowercase().required(),
    height: joi_1.default.string().lowercase().required(),
    bloodGroup: joi_1.default.string().lowercase(),
    genotype: joi_1.default.string().lowercase(),
    bloodPressure: joi_1.default.string().lowercase(),
    HIV_status: joi_1.default.string().lowercase(),
    hepatitis: joi_1.default.string().lowercase()
});
exports.updateReportSchema = joi_1.default.object().keys({
    patientName: joi_1.default.string().lowercase(),
    age: joi_1.default.number(),
    hospitalName: joi_1.default.string().lowercase(),
    weight: joi_1.default.string().lowercase(),
    height: joi_1.default.string().lowercase(),
    bloodGroup: joi_1.default.string().lowercase(),
    genotype: joi_1.default.string().lowercase(),
    bloodPressure: joi_1.default.string().lowercase(),
    HIV_status: joi_1.default.string().lowercase(),
    hepatitis: joi_1.default.string().lowercase()
});
