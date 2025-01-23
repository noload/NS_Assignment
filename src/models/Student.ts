import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Mark from "./Mark";
class Student extends Model {
  public id!: number;
  public name!: string;
  public ag!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "students", timestamps: true }
);

Student.hasMany(Mark, { foreignKey: "studentId" });
Mark.belongsTo(Student, { foreignKey: "studentId" });

export default Student;
