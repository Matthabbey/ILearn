import express from "express";

import { allReview, createReview } from "../controller/reviewController"
import { protect } from "../Middlewares/authMiddleware";

const router = express.Router();


router.get('/get-all-Review', allReview)
router.post('/review-create', protect, createReview)

export default router