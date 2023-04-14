import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

export interface ReportAttributes {
    patientId: string,
    patientName: string,
    age: number,
    hospitalName: String,
    weight: string,
    height: string,
    bloodGroup: string,
    genotype: string,
    bloodPressure: string,
    HIV_status: string,
    hepatitis: string,
    doctorsId: string
}

export class ReportInstance extends Model<ReportAttributes>{}

ReportInstance.init({
    patientId:{
        type: DataTypes.UUIDV4 ,
        primaryKey: true,
   
    },
    patientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    hospitalName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    height:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    bloodGroup:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    genotype:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    bloodPressure:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    HIV_status:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    hepatitis:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    doctorsId:{
        type: DataTypes.UUIDV4,
   
    }
},
{
    sequelize: db,
    tableName: "Reports"
}

)














