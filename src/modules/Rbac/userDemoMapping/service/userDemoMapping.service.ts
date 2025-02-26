import UserDemoMappingModel from "../model/userDemoMapping.model";
import { IUserDemoMapping } from "../type/userDemoMapping.type";

export class UserDemoMappingService {
  static createUserDemoMapping = async (UserDemoMappingData: IUserDemoMapping): Promise<IUserDemoMapping> => {
    return await UserDemoMappingModel.create(UserDemoMappingData);
  };
  
  static getAllUserDemoMappings = async (page: number, size: number) => {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;
  
    const [userDemoMappings, totalCount] = await Promise.all([
      UserDemoMappingModel.find()
        .populate({ path: "user_id", select: "name" })
        .populate({ path: "demo_product_id", select: "title" })
        .skip(skip)
        .limit(limit)
        .exec(), // Ensure execution of the query
        UserDemoMappingModel.countDocuments()
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return { userDemoMappings, totalPages, totalCount };
  };
  
  static getUserDemoMappingById = async (id: String): Promise<IUserDemoMapping | null> => {
    return await UserDemoMappingModel.findById(id)
    .populate({ path: "user_id", select: "name" })
    .populate({ path: "demo_product_id", select: "title" })
    .exec();
  };

  static updateUserDemoMapping = async (id: string, updates: Partial<IUserDemoMapping>): Promise<IUserDemoMapping | null> => {
    return await UserDemoMappingModel.findByIdAndUpdate(id, updates, { new: true });
  };
  
  static deleteUserDemoMapping = async (id: string): Promise<IUserDemoMapping | null> => {
    return await UserDemoMappingModel.findByIdAndDelete(id);
  };
}

