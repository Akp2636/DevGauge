"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const candidate_1 = __importDefault(require("./routes/candidate"));
const hr_1 = __importDefault(require("./routes/hr"));
const errorHandler_1 = require("./middlewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/candidate', candidate_1.default);
app.use('/api/hr', hr_1.default);
// Error Handling
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
