import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../Config/index";

interface courseRequestAttributes {
  [x: string]: any;
  id: string;
  status: string;
  courseId: string;
  tutorId: string;
  studentId: string;
}

export class courseRequestInstance extends Model<courseRequestAttributes> {
  declare id: string;
  declare status: string;
  declare tutorId: string;
  declare studentId: string;
  declare courseId: string;
}

courseRequestInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    tutorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "accepted", "declined"],
      defaultValue: "pending",
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    tableName: "course_requests",
  }
);
