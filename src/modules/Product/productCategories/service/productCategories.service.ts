import ProductCategoriesModel from "../model/productCategories.model";
import { IProductCategories } from "../type/productCategories.type";

export class ProductCategoriesService {
  static async createProductCategories(data: Partial<IProductCategories>) {
    return await ProductCategoriesModel.create(data);
  }

  static async getProductCategories(page: number, size: number) {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;

    const [productCategories, totalCount] = await Promise.all([
      ProductCategoriesModel.find().skip(skip).limit(limit).exec(),
      ProductCategoriesModel.countDocuments()
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return { productCategories, totalPages, totalCount };
  }

  static async getProductCategoriesById(id: string) {
    return await ProductCategoriesModel.findById(id);
  }

  static async updateProductCategories(id: string, data: Partial<IProductCategories>) {
    return await ProductCategoriesModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProductCategories(id: string) {
    return await ProductCategoriesModel.findByIdAndDelete(id);
  }
}