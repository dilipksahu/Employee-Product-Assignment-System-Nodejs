import { Document } from 'mongoose';

export interface IUserType extends Document {
    type_name: String;
    is_active: boolean;
    created_at: Date;
}