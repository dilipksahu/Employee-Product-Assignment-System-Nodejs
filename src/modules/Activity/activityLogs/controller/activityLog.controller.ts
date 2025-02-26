// activityLog.controller.ts
import { Request, Response } from 'express';
import { ActivityLogService } from '../service/activityLog.service';
import { IActivityLog } from '../type/activityLog.type';

export class ActivityLogController {
  static async createActivityLog(req: Request, res: Response): Promise<void> {
    try {
      const { session_id, action, module, performed_by, target_id } = req.body;
      const log: IActivityLog = await ActivityLogService.createActivityLog({
        session_id,
        action,
        module,
        performed_by,
        target_id,
      });
      res.status(201).json({ success: true, message: "Activity log created successfully", data: log });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUserActivityLogs(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const logs: IActivityLog[] = await ActivityLogService.getActivityLogsByUserId(userId);
      res.status(200).json({ success: true, data: logs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

