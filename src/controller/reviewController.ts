import { Express, NextFunction, Request, Response } from "express";
import { ReviewInstance } from "../model/reviewModel";

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.user?.id
    // const ratingValue = req.body.ratingValue(max: 5)
    const review = { ...req.body, studentId };
    console.log(review)
    // ReviewInstance.sync({ force: true })
    if (review.ratingValue > 5) {
        res.status(400).json({
            Error: "rating value should be more than 5"
        })
    }
    try {

        const Review = await ReviewInstance.create(review)
        return res.status(200).json({
            Message: 'Created',
            Review
        })

    } catch (error) {
        console.log(error)
        // Error: `${error}`
    }
}

export const allReview = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // ReviewInstance.sync({ force: true })




        const review = await ReviewInstance.findAll({})
        return res.status(200).json({
            totalReview: review.length,
            tutorReview: review
        })
    } catch (error) {
        console.log(error)
    }
}
// export const getReviewRating = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const page: any = req.query.page
//         const limit: any = req.query.limit

//         const startIndex = (page - 1) * limit
//         const endIndex = page * limit

//         const result = {}
//         result.next = {

//         }
//         const resultReview = ReviewInstance.slice(startIndex, endIndex)
//         res.status(200).json({})

//     } catch (error) {

//     }
// }
