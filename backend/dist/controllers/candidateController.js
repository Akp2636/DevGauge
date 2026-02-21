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
exports.updateProfile = exports.getProfile = void 0;
const db_1 = require("../config/db");
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const profile = yield db_1.prisma.candidateProfile.findUnique({
            where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
            include: {
                user: { select: { name: true, email: true, rankTag: true, ratingScore: true } },
            },
        });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        const skills = yield db_1.prisma.candidateSkill.findMany({
            where: { userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id },
            include: { skill: true },
        });
        const projects = yield db_1.prisma.project.findMany({
            where: { userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id },
        });
        res.status(200).json({ success: true, data: Object.assign(Object.assign({}, profile), { skills, projects }) });
    }
    catch (error) {
        next(error);
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { yearsExperience, githubUrl, portfolioUrl, bio } = req.body;
        const profile = yield db_1.prisma.candidateProfile.update({
            where: { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
            data: { yearsExperience, githubUrl, portfolioUrl, bio },
        });
        // Trigger score recalculation in background (mocked here directly)
        res.status(200).json({ success: true, data: profile });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfile = updateProfile;
