import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AuthRequest } from '../types/express';
import { calculateCandidateScore } from '../services/ratingEngine';

// Simulating OpenAI since the user might not have a key readily available.
// In production, we would use the actual `openai.chat.completions.create`
const analyzeProjectWithAI = async (description: string) => {
    // Deterministic mocking based on keywords for demonstration
    const desc = description.toLowerCase();
    const result = {
        complexityScore: 40,
        skills: ['Javascript', 'React'],
        summary: 'A standard frontend web application.'
    };

    if (desc.includes('kubernetes') || desc.includes('microservices') || desc.includes('distributed')) {
        result.complexityScore = 95;
        result.skills.push('Kubernetes', 'Docker', 'System Design', 'Go');
        result.summary = 'Highly complex distributed system with impressive architecture and scalability considerations.';
    } else if (desc.includes('redis') || desc.includes('queue') || desc.includes('socket')) {
        result.complexityScore = 80;
        result.skills.push('Redis', 'Node.js', 'WebSockets', 'Backend');
        result.summary = 'Solid demonstration of real-time backend concurrency and caching strategies.';
    } else if (desc.includes('postgres') || desc.includes('sql')) {
        result.complexityScore = 65;
        result.skills.push('PostgreSQL', 'Database Design');
        result.summary = 'Good implementation of relational database modeling and data integrity.';
    }

    return result;
};

export const addProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { title, description, githubUrl } = req.body;

        // 1. Analyze project using AI
        const aiAnalysis = await analyzeProjectWithAI(description);

        // 2. Save Project
        const project = await prisma.project.create({
            data: {
                userId: req.user!.id,
                title,
                description,
                githubUrl,
                aiComplexityScore: aiAnalysis.complexityScore,
                aiSummary: aiAnalysis.summary,
            },
        });

        // 3. Update or Add Skills discovered by AI
        for (const skillName of aiAnalysis.skills) {
            let skill = await prisma.skill.findUnique({ where: { name: skillName } });
            if (!skill) {
                skill = await prisma.skill.create({ data: { name: skillName } });
            }

            await prisma.candidateSkill.upsert({
                where: {
                    userId_skillId: {
                        userId: req.user!.id,
                        skillId: skill.id
                    }
                },
                update: {
                    proficiencyScore: Math.min(100, Math.max(50, aiAnalysis.complexityScore)), // Bump proficiency
                    isVerified: true
                },
                create: {
                    userId: req.user!.id,
                    skillId: skill.id,
                    proficiencyScore: Math.min(100, Math.max(50, aiAnalysis.complexityScore)),
                    isVerified: true
                }
            });
        }

        // 4. Recalculate Candidate Score
        const profile = await prisma.candidateProfile.findUnique({ where: { userId: req.user!.id } });
        const allSkills = await prisma.candidateSkill.findMany({ where: { userId: req.user!.id } });
        const allProjects = await prisma.project.findMany({ where: { userId: req.user!.id } });

        const newRating = calculateCandidateScore(
            profile?.yearsExperience || 0,
            allSkills,
            allProjects
        );

        await prisma.user.update({
            where: { id: req.user!.id },
            data: {
                ratingScore: newRating.score,
                rankTag: newRating.rankTag
            }
        });

        res.status(201).json({ success: true, data: project, newRating });
    } catch (error) {
        next(error);
    }
};
