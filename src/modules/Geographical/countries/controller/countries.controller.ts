import { Request, Response } from "express";
import CountriesService from "../service/countries.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class CountriesController {
  static async createCountries(req: Request, res: Response): Promise<void> {
    try {
      const Country = await CountriesService.createCountries(req.body);
      const response: ApiResponse = {
        success: true,
        message: "Country created successfully",
        data: Country,
      };
      sendApiResponse(res, 201, response);
    } catch (error: any) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating country",
      });
    }
  }

  static async getAllCountries(req: Request, res: Response): Promise<void> {
    try {
      const region_id = req.query.region_id as string;
      if (!region_id) {
        sendApiResponse(res, 400, { success: false, message: "Region ID is required" });
        return;
      }
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { countries, totalPages, totalCount } = await CountriesService.getAllCountries({ region_id }, page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All Countries",
          page,
          size,
          totalPages,
          totalCount,
          data: countries
        }
      );
    } catch (error: any) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching countries",
      });
    }
  }

  static async getCountriesById(req: Request, res: Response): Promise<void> {
    try {
      const country = await CountriesService.getCountriesById(req.params.id);
      if (!country) { sendApiResponse(res, 404, { success: false, message: "Country not found", data: country }); };
      sendApiResponse(res, 200, { success: true, message: "Country Found", data: country });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching Country",
      });
    }
  }

  static async updateCountries(req: Request, res: Response): Promise<any> {
    try {
      const country = await CountriesService.updateCountries(req.params.id, req.body);
      if (!country) { return sendApiResponse(res, 404, { success: false, message: "Country not found", data: country }); };
      return sendApiResponse(res, 200, { success: true, message: "Country updated successfully", data: country });
    } catch (error: any) {
      return sendApiResponse(res, 500, {
        success: false,
        message: "Error updating Country",
      });
    }
  }

  static async deleteCountries(req: Request, res: Response): Promise<any> {
    try {
      const country = await CountriesService.deleteCountries(req.params.id);
      if (!country) { return sendApiResponse(res, 404, { success: false, message: "Country not found", data: country }); };
      return sendApiResponse(res, 200, { success: true, message: "Country deleted successfully", data: country });
    } catch (error: any) {
      return sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting Country",
      });
    }
  }
}

