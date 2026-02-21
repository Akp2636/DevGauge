import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { AuthRequest } from '../types/express';

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role,
            },
        });

        if (role === 'CANDIDATE') {
            await prisma.candidateProfile.create({
                data: { userId: user.id },
            });
        }

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(401);
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid credentials');
        }

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user?.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                rankTag: true,
                ratingScore: true,
            },
        });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
