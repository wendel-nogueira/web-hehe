import { IGamesRepository } from './i-games.repository';
import { CreateGamesDto } from '../dto/create-game.dto';
import { UpdateGamesDto } from '../dto/update-game.dto';
import { Game } from '../entities/game.entity';
import { PrismaClient } from '@prisma/client'


export class GamesRepository implements IGamesRepository {
    prisma: any;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async findAll(): Promise<Game[]> {
        return this.prisma.game.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findAllWithoutImages(): Promise<Game[]> {
        return this.prisma.game.findMany({
            select: {
                id: true,
                title: true,
                genre: true,
                developer: true,
                console: true,
                rating: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async findOne(id: string): Promise<any> {
        return this.prisma.game.findUnique({
            where: {
                id: id
            }
        });
    }

    async findByTitle(title: string): Promise<any> {
        return this.prisma.game.findUnique({
            where: {
                title: title
            },
        });
    }

    async findByGenre(genre: string): Promise<any> {
        return this.prisma.game.findMany({
            where: {
                genre: genre
            },
            orderBy: {
                rating: 'desc'
            },
            take: 3
        });
    }

    async findByDeveloper(developer: string): Promise<any> {
        return this.prisma.game.findMany({
            where: {
                developer: developer
            },
            orderBy: {
                rating: 'desc'
            },
            take: 3
        });
    }

    async findTop(console: string): Promise<any> {
        return this.prisma.game.findMany({
            where: {
                console: console
            },
            orderBy: {
                rating: 'desc'
            },
            take: 3
        });
    }

    async findAllDevelopers(): Promise<any> {
        return this.prisma.game.findMany({
            select: {
                developer: true
            },
            distinct: ['developer']
        });
    }

    async findAllTitles(): Promise<any> {
        return this.prisma.game.findMany({
            select: {
                title: true
            },
            distinct: ['title']
        });
    }
    
    async create(createGameDto: CreateGamesDto): Promise<Game> {
        const newGame = {
            ...createGameDto,
            reviews: []
        }

        const game = await this.prisma.game.create({
            data: newGame
        });
        
        return game;
    }

    async update(id: string, updateGameDto: UpdateGamesDto): Promise<Game> {
        const game = await this.prisma.game.update({
            where: {
                id: id
            },
            data: updateGameDto
        });

        return game;
    }

    async remove(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}
