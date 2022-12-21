import { Request, Response, NextFunction } from 'express';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';


export class ReviewsController {
    async findAll(req: Request, res: Response, next: NextFunction) {
        const reviewsService = new ReviewsService();
        const { gameId } = req.params;
        const reviews = await reviewsService.findAll(gameId);

        return res.status(200).json(reviews);
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        const reviewsService = new ReviewsService();
        const { gameId, id } = req.params;
        const review = await reviewsService.findOne(gameId, id);

        return res.status(200).json(review);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const reviewsService = new ReviewsService();
        const { gameId } = req.params;
        const body = req.body as CreateReviewDto;
        const review = await reviewsService.create(gameId, body);

        return res.status(201).json(review);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const reviewsService = new ReviewsService();
        const { gameId, id } = req.params;
        const review = await reviewsService.update(gameId, id, req.body as UpdateReviewDto);

        return res.status(200).json(review);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const reviewsService = new ReviewsService();
        const { gameId, id } = req.params;
        const review = await reviewsService.remove(gameId, id);

        return res.status(200).json(review);
    }
}
