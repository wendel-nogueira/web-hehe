import { IReviewsRepository } from './i-reviews.repository';
import { CreateReviewDto } from '../../reviews/dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { Review } from '../entities/review.entity';
import { PrismaClient } from '@prisma/client';
import { Review as TypeReview } from '../types/review.type';
import { v4 } from 'uuid';


export class ReviewsRepository implements IReviewsRepository {
    prisma: any;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async findAll(gameId: string): Promise<Review[]> {
        const reviews = await this.prisma.game.findUnique({
            where: {
                id: gameId
            },
            include: {
                reviews: true
            }
        });

        return reviews.reviews;
    }

    async findOne(gameId: string, id: string): Promise<any> {
        const game = await this.prisma.game.findUnique({
            where: {
                id: gameId
            },
            include: {
                reviews: true
            }
        });

        for (const review of game.reviews) {
            if (review.id === id) {
                return review;
            }
        }

        return null;
    }

    async create(gameId: string, createReviewDto: CreateReviewDto): Promise<Review> {
        const newReview: TypeReview = {
            id: v4(),
            title: createReviewDto.title,
            review: createReviewDto.review,
            rating: createReviewDto.rating,
            userId: createReviewDto.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const gameInfo = await this.prisma.game.findUnique({
            where: {
                id: gameId
            },
        });

        const gameReviewsQuantity = gameInfo.reviews ? gameInfo.reviews.length : 0;
        const newGameRating = (gameInfo.rating * gameReviewsQuantity + newReview.rating) / (gameReviewsQuantity + 1);

        const review = await this.prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                rating: newGameRating,
                reviews: {
                    push: newReview
                }
            }
        });

        return review.reviews[0];
    }

    async update(gameId: string, id: string, updateReviewDto: UpdateReviewDto): Promise<any> {
        const game = await this.prisma.game.findUnique({
            where: {
                id: gameId
            },
            include: {
                reviews: true
            }
        });

        if (game === null) {
            return null;
        }

        const reviews = game.reviews;
        let reviewIndex = -1;

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].id === id) {
                reviewIndex = i;
                break;
            }
        }

        if (reviewIndex === -1) {
            return null;
        }

        const review = reviews[reviewIndex];

        if (updateReviewDto.title !== undefined) {
            review.title = updateReviewDto.title;
        }

        if (updateReviewDto.review !== undefined) {
            review.review = updateReviewDto.review;
        }

        if (updateReviewDto.rating !== undefined) {
            review.rating = updateReviewDto.rating;
        }

        review.updatedAt = new Date();
        reviews[reviewIndex] = review;

        await this.prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                reviews: reviews
            }
        });

        return review;
    }

    async remove(gameId: string, id: string): Promise<void> {
        const game = await this.prisma.game.findUnique({
            where: {
                id: gameId
            },
            include: {
                reviews: true
            }
        });
        
        if (game === null) {
            return;
        }

        const reviews = game.reviews;

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].id === id) {
                reviews.splice(i, 1);
                break;
            }
        }

        await this.prisma.game.update({
            where: {
                id: gameId
            },
            data: {
                reviews: reviews
            }
        });

        return;
    }
}
