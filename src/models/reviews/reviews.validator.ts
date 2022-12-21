import { CreateReviewDto } from './dto/create-review.dto';
import { validateOrReject } from 'class-validator';


export class ReviewsValidator {
    async validateCreateReviewDto(review: CreateReviewDto) {
        const validateUser = new CreateReviewDto();

        validateUser.title = review.title;
        validateUser.review = review.review;
        validateUser.rating = review.rating;
        validateUser.userId = review.userId;

        await validateOrReject(validateUser).catch(errors => {
            const errorMessage: any = errors.map((error: { constraints: any; }) => {
                return Object.values(error.constraints).map((constraint: any) => {
                    return constraint;
                });
            });

            throw new Error(JSON.stringify(errorMessage));
        });
    }
}
