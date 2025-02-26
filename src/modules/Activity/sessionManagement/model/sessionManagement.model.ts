import mongoose, { Schema } from 'mongoose';
import { ISessionManagement } from '../type/sessionManagement.type';

const SessionManagementSchema: Schema = new Schema({
    lat: {
        type: Number,
        required: true,
    },
    log: {
        type: Number,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User ', // Assuming you have a User model
        required: true,
    },
    deviceType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SessionManagementModel = mongoose.model<ISessionManagement>('SessionManagement', SessionManagementSchema);

export default SessionManagementModel;