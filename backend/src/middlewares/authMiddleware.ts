import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/express';

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: `User role ${req.user?.role} is not authorized` });
        }
        next();
    };
};
