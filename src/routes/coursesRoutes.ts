import express, { Request, Response } from "express";
import { addCourse, getAllCourses } from "../controller/courseController";
import { getAllUsers,  Login, Register } from "../controller/userController";
import { protect } from "../Middlewares/authMiddleware";
import {getStudentHistory} from "../controller/courseController";

const router = express.Router();

router.post("/addCourse", protect, addCourse);
router.get("/", getAllCourses);
router.get("/getStudentHistory", protect, getStudentHistory);

export default router;
