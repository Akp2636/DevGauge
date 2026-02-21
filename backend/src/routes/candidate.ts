import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/candidateController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);
router.use(authorize('CANDIDATE'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;
