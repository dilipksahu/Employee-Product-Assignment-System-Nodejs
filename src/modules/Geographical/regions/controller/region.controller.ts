import { Request, Response } from "express";
import RegionService from "../service/region.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class RegionController {
  static async createRegion(req: Request, res: Response): Promise<void> {
    try {
      const region = await RegionService.createRegion(req.body);
      const response: ApiResponse = {
        success: true,
        message: "Region created successfully",
        data: region,
      };
      sendApiResponse(res, 201, response);
    } catch (error: any) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating region",
      });
    }
  }

  static async getAllRegions(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { regions, totalPages, totalCount } = await RegionService.getAllRegions(page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All Regions",
          page,
          size,
          totalPages,
          totalCount,
          data: regions
        }
      );
    } catch (error: any) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching regions",
      });
    }
  }

  static async getRegionById(req: Request, res: Response): Promise<void> {
    try {
      const region = await RegionService.getRegionById(req.params.id);
      if (!region) { sendApiResponse(res, 404, { success: false, message: "Region not found", data: region }); return;};
      sendApiResponse(res, 200, { success: true, message: "Region Found", data: region });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching region",
      });
    }
  }

  static async updateRegion(req: Request, res: Response): Promise<any> {
    try {
      const region = await RegionService.updateRegion(req.params.id, req.body);
      if (!region) { return sendApiResponse(res, 404, { success: false, message: "Region not found", data: region }); };
      return sendApiResponse(res, 200, { success: true, message: "Region updated successfully", data: region });
    } catch (error: any) {
      return sendApiResponse(res, 500, {
        success: false,
        message: "Error updating region",
      });
    }
  }

  static async deleteRegion(req: Request, res: Response): Promise<any> {
    try {
      const region = await RegionService.deleteRegion(req.params.id);
      if (!region) { return sendApiResponse(res, 404, { success: false, message: "Region not found", data: region }); };
      return sendApiResponse(res, 200, { success: true, message: "Region deleted successfully", data: region });
    } catch (error: any) {
      return sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting region",
      });
    }
  }
}

