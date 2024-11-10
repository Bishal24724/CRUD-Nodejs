import connection from "./index.js";
import { DataTypes} from "sequelize";

export const Student = connection.define("students",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        notEmpty:true,
        len: [3,25],
       
       
    },
  },
  age:{
    type:DataTypes.INTEGER,
    allowNull: false,
    validate:{
        isInt: true,
        min:1,
        max:100,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        isEmail:true,
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        len:[5,25], 
    }
  },

},{
    timestamps: false,
});
