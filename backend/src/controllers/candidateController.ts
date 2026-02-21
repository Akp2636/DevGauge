import { Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../types/express';
import { calculateCandidateScore } from '../services/ratingEngine';

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const profile = await prisma.candidateProfile.findUnique({
            where: { userId: req.user?.id },
            include: {
                user: { select: { name: true, email: true, rankTag: true, ratingScore: true } },
            },
        });

        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        const skills = await prisma.candidateSkill.findMany({
            where: { userId: req.user?.id },
            include: { skill: true },
        });

        const projects = await prisma.project.findMany({
            where: { userId: req.user?.id },
        });

        res.status(200).json({ success: true, data: { ...profile, skills, projects } });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { yearsExperience, githubUrl, portfolioUrl, bio } = req.body;

        const profile = await prisma.candidateProfile.update({
            where: { userId: req.user?.id },
            data: { yearsExperience, githubUrl, portfolioUrl, bio },
        });

        // Trigger score recalculation in background (mocked here directly)
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        next(error);
    }
};
