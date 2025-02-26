import { Request, Response } from "express";
import CitiesService from "../service/cities.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class CitiesController {
  static async createCities(req: Request, res: Response): Promise<void> {
    try {
      const city = await CitiesService.createCities(req.body);
      const response: ApiResponse = {
        success: true,
        message: "City created successfully",
        data: city,
      };
      sendApiResponse(res, 201, response);
    } catch (error: any) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating city",
      });
    }
  }

  static async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const country_id = req.query.country_id as string;
      if (!country_id) {
        sendApiResponse(res, 400, { success: false, message: "Country ID is required" });
        return;
      }
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { cities, totalPages, totalCount } = await CitiesService.getAllCities({ country_id }, page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All cities",
          page,
          size,
          totalPages,
          totalCount,
          data: cities
        }
      );
    } catch (error: any) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching cities",
      });
    }
  }

  static async getCitiesById(req: Request, res: Response): Promise<void> {
    try {
      const city = await CitiesService.getCitiesById(req.params.id);
      if (!city) { sendApiResponse(res, 404, { success: false, message: "Country not found", data: city }); };
      sendApiResponse(res, 200, { success: true, message: "Country Found", data: city });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching city",
      });
    }
  }

  static async updateCities(req: Request, res: Response): Promise<any> {
    try {
      const city = await CitiesService.updateCities(req.params.id, req.body);
      if (!city) { return sendApiResponse(res, 404, { success: false, message: "city not found", data: city }); };
      return sendApiResponse(res, 200, { success: true, message: "city updated successfully", data: city });
    } catch (error: any) {
      return sendApiResponse(res, 500, {
        success: false,
        message: "Error updating city",
      });
    }
  }

  static async deleteCities(req: Request, res: Response): Promise<any> {
    try {
      const city = await CitiesService.deleteCities(req.params.id);
      if (!city) { return sendApiResponse(res, 404, { success: false, message: "city not found", data: city }); };
      return sendApiResponse(res, 200, { success: true, message: "city deleted successfully", data: city });
    } catch (error: any) {
      return sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting city",
      });
    }
  }
}

