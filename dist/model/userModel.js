"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    doctorsName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // firstName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true
    // },
    specialization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    sequelize: database_config_1.default,
    tableName: "Appointment"
});
