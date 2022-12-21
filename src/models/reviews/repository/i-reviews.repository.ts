import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';


export interface IReviewsRepository {
    findAll(gameId: string): Promise<Review[]>;
    findOne(gameId: string, id: string): Promise<any>;
    create(gameId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    update(gameId: string, id: string, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(gameId: string, id: string): Promise<void>;
}
