import { Router } from 'express';
import { getDashboardCounts } from '../controllers/dashboardController';

const router = Router();

router.get('/dashboard/counts', getDashboardCounts);

export default router;
