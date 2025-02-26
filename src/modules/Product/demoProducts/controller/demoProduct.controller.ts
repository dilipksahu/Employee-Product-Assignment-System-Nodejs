import { Request, Response } from "express";
import { DemoProductService } from "../service/demoProduct.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class DemoProductController {

  static addDemoProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const demoProduct = await DemoProductService.createDemoProduct(req.body);
      const response: ApiResponse = {
        success: true,
        message: "Demo Product created successfully",
        data: demoProduct,
      };
      sendApiResponse(res, 201, response);
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating demo product",
      });
    }
  };

  static fetchDemoProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { demoProducts, totalPages, totalCount } = await DemoProductService.getAllDemoProducts(page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All Demo Product",
          page,
          size,
          totalPages,
          totalCount,
          data: demoProducts
        }
      );
    } catch (error) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching demo product",
      });
    }
  };

  static async fetchDemoProductById(req: Request, res: Response): Promise<void> {
    try {
      const demoProduct = await DemoProductService.getDemoProductById(req.params.id);
      if (!demoProduct) { sendApiResponse(res, 404, { success: false, message: "Demo Product not found", data: demoProduct }); return;};
      sendApiResponse(res, 200, { success: true, message: "Demo Product Found", data: demoProduct });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching demo product",
      });
    }
  }

  static editDemoProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const demoProduct = await DemoProductService.updateDemoProduct(req.params.id, req.body);
      if (!demoProduct) { sendApiResponse(res, 404, { success: false, message: "Demo Product not found", data: demoProduct }); return;};
      sendApiResponse(res, 200, { success: true, message: "Demo Product updated successfully", data: demoProduct });
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error updating demo product",
      });
    }
  };

  static removeDemoProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const demoProduct = await DemoProductService.deleteDemoProduct(req.params.id);
      if (!demoProduct) { sendApiResponse(res, 404, { success: false, message: "Demo Product not found", data: demoProduct }); return;};
      sendApiResponse(res, 200, { success: true, message: "Demo product Found", data: demoProduct });
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting demo product",
      });
    }
  };

}