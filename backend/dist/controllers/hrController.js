"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidates = void 0;
const db_1 = require("../config/db");
const getCandidates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { minScore, ranks } = req.query;
        const whereClause = { role: 'CANDIDATE' };
        if (minScore) {
            whereClause.ratingScore = { gte: parseInt(minScore, 10) };
        }
        if (ranks) {
            const rankArray = ranks.split(',');
            whereClause.rankTag = { in: rankArray };
        }
        const candidates = yield db_1.prisma.user.findMany({
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
    }
    catch (error) {
        next(error);
    }
});
exports.getCandidates = getCandidates;
