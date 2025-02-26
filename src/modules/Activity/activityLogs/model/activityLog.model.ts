// activityLog.model.ts
import mongoose, { Schema } from 'mongoose';
import { IActivityLog } from '../type/activityLog.type';

const ActivityLogSchema: Schema = new Schema({
    session_id: {
        type: Schema.Types.ObjectId,
        ref: 'SessionManagement', // Reference to the session management model
        required: true,
    },
    action: {
        type: String,
        enum: ['CREATE', 'UPDATE', 'DELETE', 'ASSIGN'],
        required: true,
    },
    module: {
        type: String,
        enum: ['Users', 'DemoProducts', 'User DemoMapping'],
        required: true,
    },
    performed_by: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the user model
        required: true,
    },
    target_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

export default ActivityLog;