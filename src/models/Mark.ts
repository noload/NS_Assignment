import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Mark extends Model {
  public id!: number;
  public studentId!: number;
  public subject!: string;
  public mark!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}
Mark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "marks", timestamps: true }
);

export default Mark;
