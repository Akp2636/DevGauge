import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import candidateRoutes from './routes/candidate';
import hrRoutes from './routes/hr';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/hr', hrRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
