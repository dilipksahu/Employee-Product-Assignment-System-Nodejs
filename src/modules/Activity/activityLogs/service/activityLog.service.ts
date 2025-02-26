// activityLog.service.ts
import ActivityLog from '../model/activityLog.model';
import { IActivityLog } from '../type/activityLog.type';

export class ActivityLogService {
  static async createActivityLog(logData: Partial<IActivityLog>): Promise<IActivityLog> {
    const activityLog = new ActivityLog(logData);
    return await activityLog.save();
  }

  static async getActivityLogsByUserId(userId: string): Promise<IActivityLog[]> {
    return await ActivityLog.find({ performed_by: userId }).populate('session_id').populate('performed_by');
  }

  static async getActivityLogsByModule(module: string): Promise<IActivityLog[]> {
    return await ActivityLog.find({ module });
  }
}

