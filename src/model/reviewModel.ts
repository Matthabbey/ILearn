import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../Config/index";

export interface ReviewAttributes {
    [x: string]: any;
    description: string;
    ratingValue: number;
}

export class ReviewInstance extends Model<ReviewAttributes> {
    static slice() {
        throw new Error("Method not implemented.");
    }

    declare description: string;
    declare ratingValue: number;
}

ReviewInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tutorId: {
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
            validate: {
                max: 5
            }
        },
    },

    {
        sequelize: db,
        tableName: "rating",
    }
);