import { Router } from 'express';
import {SessionManagementController} from '../controller/sessionManagement.controller';
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

// Create a new session
router.post('/sessions',authenticate, SessionManagementController.createSession);

// Get sessions by user ID
router.get('/sessions/:userId',authenticate, SessionManagementController.getUserSessions);

// Delete a session by ID
router.delete('/sessions/:sessionId',authenticate, SessionManagementController.deleteSession);

export default router;