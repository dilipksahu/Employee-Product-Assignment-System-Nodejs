import { Request, Response } from 'express';
import { SessionManagementService } from '../service/sessionManagement.service';
import { ISessionManagement } from '../type/sessionManagement.type';

export class SessionManagementController {
    static async createSession(req: Request, res: Response): Promise<void> {
        try {
            const { lat, log, ip, userId, deviceType } = req.body;
            const session: ISessionManagement = await SessionManagementService.createSession({
                lat,
                log,
                ip,
                userId,
                deviceType,
            });
            res.status(201).json({ success: true, message: "Session created successfully", data: session });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getUserSessions(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const sessions: ISessionManagement[] = await SessionManagementService.getSessionsByUserId(userId);
            res.status(200).json({ success: true, data: sessions });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async deleteSession(req: Request, res: Response): Promise<void> {
        try {
            const sessionId = req.params.sessionId;
            const session = await SessionManagementService.deleteSession(sessionId);
            if (!session) {
                res.status(404).json({ success: false, message: 'Session not found' });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

