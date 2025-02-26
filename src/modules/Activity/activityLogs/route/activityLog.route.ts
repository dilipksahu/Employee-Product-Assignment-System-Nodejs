// activityLog.route.ts
import { Router } from 'express';
import { ActivityLogController } from '../controller/activityLog.controller';

const router = Router();

// Create a new activity log
router.post('/activity-logs', ActivityLogController.createActivityLog);

// Get activity logs by user ID
router.get('/activity-logs/user/:userId', ActivityLogController.getUserActivityLogs);

export default router