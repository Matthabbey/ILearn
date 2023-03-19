import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../Config/index";

export interface RatingAttributes {
  [x: string]: any;
  id: string;
  title: string;
  description: string;
  courseId: string;
  studentId: string;
  ratingValue: number;
}

export class RatingInstance extends Model<RatingAttributes> {
  declare id: string;
  declare title: string;
  declare description: string;
  declare courseId: string;
  declare studentId: string;
  declare ratingValue: number;
}

RatingInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    ratingValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    tableName: "rating",
  }
);
