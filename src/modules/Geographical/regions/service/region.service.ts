import RegionModel from "../model/region.model";
import { IRegion } from "../type/region.type";

class RegionService {
  async createRegion(data: IRegion) {
    return await RegionModel.create(data);
  }

  async getAllRegions(page: number, size: number) {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;
  
    const [regions, totalCount] = await Promise.all([
      RegionModel.find().skip(skip).limit(limit).exec(),
      RegionModel.countDocuments()
    ]);
  
    const totalPages = Math.ceil(totalCount / limit);
  
    return { regions, totalPages, totalCount };
  }
  
  async getRegionById(id: string) {
    return await RegionModel.findById(id);
  }

  async updateRegion(id: string, data: Partial<IRegion>) {
    return await RegionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRegion(id: string) {
    return await RegionModel.findByIdAndDelete(id);
  }
}

export default new RegionService();
