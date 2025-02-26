import { Document } from 'mongoose';

export interface IProductCategories extends Document {
    name: String;
    description: String;
    is_active: boolean;
    created_at: Date;
}