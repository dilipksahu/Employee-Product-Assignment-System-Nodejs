import { Document } from 'mongoose';

export interface IActivityLog extends Document {
    session_id: string; // Reference to the session
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ASSIGN'; // Action type
    module: 'Users' | 'DemoProducts' | 'User DemoMapping'; // Module name
    performed_by: string; // Reference to the user who performed the action
    target_id: string; // Reference to the target document
    created_at?: Date; // Optional field for creation date
}