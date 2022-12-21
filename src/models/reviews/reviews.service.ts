import { ReviewsRepository } from './repository/reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsValidator } from './reviews.validator';
import { ObjectId } from 'mongodb';


export class ReviewsService {
    private reviewsRepository: ReviewsRepository;

    constructor() {
        this.reviewsRepository = new ReviewsRepository();
    }

    async findAll(gameId: string) {
        if (!ObjectId.isValid(gameId)) {
            throw new Error('Invalid game ID');
        }

        return await this.reviewsRepository.findAll(gameId);
    }

    async findOne(gameId: string, id: string) {
        if (!ObjectId.isValid(gameId)) {
            throw new Error('Invalid game ID');
        }

        return await this.reviewsRepository.findOne(gameId, id);
    }

    async create(gameId: string, review: CreateReviewDto) {
        if (!ObjectId.isValid(gameId)) {
            throw new Error('Invalid game ID');
        }

        const reviewsValidator = new ReviewsValidator();
        await reviewsValidator.validateCreateReviewDto(review);

        return await this.reviewsRepository.create(gameId, review);
    }

    async update(gameId: string, id: string, review: UpdateReviewDto) {
        if (!ObjectId.isValid(gameId)) {
            throw new Error('Invalid game ID');
        }

        return await this.reviewsRepository.update(gameId, id, review);
    }

    async remove(gameId: string, id: string) {
        if (!ObjectId.isValid(gameId)) {
            throw new Error('Invalid game ID');
        }

        return await this.reviewsRepository.remove(gameId, id);
    }
}
