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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const userExists = yield db_1.prisma.user.findUnique({ where: { email } });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash(password, salt);
        const user = yield db_1.prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role,
            },
        });
        if (role === 'CANDIDATE') {
            yield db_1.prisma.candidateProfile.create({
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
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401);
            throw new Error('Invalid credentials');
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.passwordHash);
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
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
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
    }
    catch (error) {
        next(error);
    }
});
exports.getMe = getMe;
