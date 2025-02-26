import { Document } from 'mongoose';

export interface ISessionManagement extends Document {
    lat: number; // Latitude
    log: number; // Longitude
    ip: string; // IP address
    userId: string; // Reference to the user
    deviceType: string; // Type of device (e.g., mobile, desktop)
    createdAt?: Date; // Optional field for session creation date
}