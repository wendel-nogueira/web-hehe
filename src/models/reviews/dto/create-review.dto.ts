import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    review: string;

    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @IsNotEmpty()
    @IsString()
    userId: string;
}