import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../Config/index";

export interface courseAttributes {
  [x: string]: any;
  id: string;
  title: string;
  description: string;
  tutorId: string;
  pricing: string;
  category: string;
}

export class courseInstance extends Model<courseAttributes> {
  declare id: string;
  declare title: string;
  declare description: string;
  declare tutorId: string;
  declare pricing: string;
  declare category: string;
  declare image: string;
}

courseInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tutorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pricing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    tableName: "courses",
  }
);
