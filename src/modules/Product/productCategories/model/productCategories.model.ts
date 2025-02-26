import mongoose, { Document, Schema } from 'mongoose';
import { IProductCategories } from '../type/productCategories.type';


// Create the UserType schema
const ProductCategoriesSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
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
const ProductCategoriesModel = mongoose.model<IProductCategories>('ProductCategories', ProductCategoriesSchema);

export default ProductCategoriesModel;