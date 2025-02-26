import DemoProductModel from "../model/demoProduct.model";
import { IDemoProduct } from "../type/demoProduct.type";

export class DemoProductService {
  static createDemoProduct = async (demoProductData: IDemoProduct): Promise<IDemoProduct> => {
    return await DemoProductModel.create(demoProductData);
  };
  
  static getAllDemoProducts = async (page: number, size: number) => {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;
  
    const [demoProducts, totalCount] = await Promise.all([
      DemoProductModel.find()
        .populate({ path: "product_category_id", select: "name" })
        .skip(skip)
        .limit(limit)
        .exec(), // Ensure execution of the query
      DemoProductModel.countDocuments()
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return { demoProducts, totalPages, totalCount };
  };
  
  static getDemoProductById = async (id: String): Promise<IDemoProduct | null> => {
    return await DemoProductModel.findById(id)
      .populate("product_category_id", "name")
  };

  static updateDemoProduct = async (id: string, updates: Partial<IDemoProduct>): Promise<IDemoProduct | null> => {
    return await DemoProductModel.findByIdAndUpdate(id, updates, { new: true });
  };
  
  static deleteDemoProduct = async (id: string): Promise<IDemoProduct | null> => {
    return await DemoProductModel.findByIdAndDelete(id);
  };
}

