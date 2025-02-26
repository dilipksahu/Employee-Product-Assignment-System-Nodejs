import UserTypeModel from "../model/userType.model";
import { IUserType } from "../type/userType.type";

export class UserTypeService {
  static async createUserType(data: Partial<IUserType>) {
    return await UserTypeModel.create(data);
  }

  static async getUserTypes(page: number, size: number) {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;

    const [userTypes, totalCount] = await Promise.all([
      UserTypeModel.find().skip(skip).limit(limit).exec(),
      UserTypeModel.countDocuments()
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return { userTypes, totalPages, totalCount };
  }

  static async getUserTypeById(id: string) {
    return await UserTypeModel.findById(id);
  }

  static async updateUserType(id: string, data: Partial<IUserType>) {
    return await UserTypeModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteUserType(id: string) {
    return await UserTypeModel.findByIdAndDelete(id);
  }
}