import CountriesModel from "../model/countries.model";
import { ICountries } from "../type/countries.type";

class CountriesService {
  async createCountries(data: ICountries) {
    return await CountriesModel.create(data);
  }

  async getAllCountries(query: {region_id: string },page: number, size: number) {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;
  
    const [countries, totalCount] = await Promise.all([
      CountriesModel.find(query).skip(skip).limit(limit).exec(),
      CountriesModel.countDocuments()
    ]);
  
    const totalPages = Math.ceil(totalCount / limit);
  
    return { countries, totalPages, totalCount };
  }
  
  async getCountriesById(id: string) {
    return await CountriesModel.findById(id);
  }

  async updateCountries(id: string, data: Partial<ICountries>) {
    return await CountriesModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCountries(id: string) {
    return await CountriesModel.findByIdAndDelete(id);
  }
}

export default new CountriesService();
