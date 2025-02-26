import mongoose, { Document, Schema } from 'mongoose';
import { IUserType } from '../type/userType.type';


// Create the UserType schema
const UserTypeSchema: Schema = new Schema({
    type_name: { type: String, required: true, unique: true },
    is_active: {
        type: Boolean,
        default: true, // Default value for is_active
    },
    created_at: {
        type: Date,
        default: Date.now, // Default value for created_at
    },
});

// Create the UserType model
const UserTypeModel = mongoose.model<IUserType>('UserType', UserTypeSchema);

export default UserTypeModel;