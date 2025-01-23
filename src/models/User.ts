import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!:string;
  public role!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          min:6
        }
      },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values:["Admin","Teacher"],
      defaultValue:"Teacher"
    },
  },
  { sequelize, tableName: "users", timestamps: true }
);

export default User;
