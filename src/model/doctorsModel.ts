import { DataTypes, Model} from "sequelize";
import db from "../config/database.config";
import { ReportInstance } from "./reportModel";


export interface DoctorAttributes {
    doctorsId: string,
    doctorsName: string;
    email: string; // no duplicates allowed.
    specialization: string;
    gender: string;
    phoneNumber: string;
    password: string;
}

export class DoctorInstance extends Model<DoctorAttributes>{}

DoctorInstance.init({
    doctorsId:{
        type: DataTypes.UUIDV4 ,
        primaryKey: true,
        allowNull: false, 
    },
    doctorsName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: db,
    tableName: "Doctors"
}
)

DoctorInstance.hasMany(ReportInstance, {foreignKey: 'doctorsId', as: 'Reports'});
ReportInstance.belongsTo(DoctorInstance, {foreignKey: 'doctorsId', as: 'Doctors'})






