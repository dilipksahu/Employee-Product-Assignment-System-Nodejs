import SessionManagement from '../model/sessionManagement.model';
import { ISessionManagement } from '../type/sessionManagement.type';

export class SessionManagementService {
    static async createSession(sessionData: Partial<ISessionManagement>): Promise<ISessionManagement> {
        const session = new SessionManagement(sessionData);
        return await session.save();
    }

    static async getSessionsByUserId(userId: string): Promise<ISessionManagement[]> {
        return await SessionManagement.find({ userId });
    }

    static async deleteSession(sessionId: string): Promise<ISessionManagement | null> {
        return await SessionManagement.findByIdAndDelete(sessionId);
    }

    static async deleteSessionsByUserId(userId: string): Promise<void> {
        await SessionManagement.deleteMany({ userId });
    }
}
