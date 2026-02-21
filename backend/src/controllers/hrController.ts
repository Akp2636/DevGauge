import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../types/express';

export const getCandidates = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { minScore, ranks } = req.query;

        const whereClause: any = { role: 'CANDIDATE' };

        if (minScore) {
            whereClause.ratingScore = { gte: parseInt(minScore as string, 10) };
        }

        if (ranks) {
            const rankArray = (ranks as string).split(',');
            whereClause.rankTag = { in: rankArray };
        }

        const candidates = await prisma.user.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                rankTag: true,
                ratingScore: true,
                candidateProfile: {
                    select: { yearsExperience: true, bio: true }
                },
                skills: {
                    include: { skill: true }
                }
            },
            orderBy: { ratingScore: 'desc' },
            take: 50, // Limit for performance
        });

        res.status(200).json({ success: true, data: candidates });
    } catch (error) {
        next(error);
    }
};
