import { Express, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { courseInstance } from "../model/courseModel";
import { UserInstance } from "../model/userModel";


const addCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, pricing, category, image } = req.body;
    const newCourse = {
      title,
      description,
      image,
      pricing: pricing.toLocaleString(),
      category,
      tutorId: req.user?.id,
    };
    await courseInstance.create(newCourse);

    const courses = await courseInstance.findAll();
    console.log(courses);

    //jggj

    res.send(courses);
  } catch (error) {
    res.send(error);
  }
};
const getAllCourses = async () => {};

const getStudentHistory = async ( req:JwtPayload, res:Response  ) => {
  try {
    const { id } = req.user 
    console.log(id);
    
    const courses = await courseInstance.findAll({
      where: { tutorId: id },
    });
    return res.status(200).json({
      courses: courses
    });
  } catch (error) {
    res.status(500).json({
      message: "error.message",
    });
  }
  console.log(req.user);
};


export { addCourse, getAllCourses, getStudentHistory};

