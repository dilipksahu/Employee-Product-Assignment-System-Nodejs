import CitiesModel from "../model/cities.model";
import { ICities } from "../type/cities.type";

class CitiesService {
  async createCities(data: ICities) {
    return await CitiesModel.create(data);
  }

  async getAllCities(query: { country_id: string},page: number, size: number) {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;

    const [cities, totalCount] = await Promise.all([
      CitiesModel.find(query).skip(skip).limit(limit).exec(),
      CitiesModel.countDocuments()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return { cities, totalPages, totalCount };
  }

  async getCitiesById(id: string) {
    return await CitiesModel.findById(id);
  }

  async updateCities(id: string, data: Partial<ICities>) {
    return await CitiesModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCities(id: string) {
    return await CitiesModel.findByIdAndDelete(id);
  }
}

export default new CitiesService();
