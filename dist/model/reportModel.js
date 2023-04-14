"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class ReportInstance extends sequelize_1.Model {
}
exports.ReportInstance = ReportInstance;
ReportInstance.init({
    patientId: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    patientName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    hospitalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    height: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    bloodGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    genotype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    bloodPressure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    HIV_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    hepatitis: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    doctorsId: {
        type: sequelize_1.DataTypes.UUIDV4,
    }
}, {
    sequelize: database_config_1.default,
    tableName: "Reports"
});
