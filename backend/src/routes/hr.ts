import { Router } from 'express';
import { getCandidates } from '../controllers/hrController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);
router.use(authorize('HR'));

router.get('/candidates', getCandidates);

export default router;
