import { Request, Response } from "express";
import { ProductCategoriesService } from "../service/productCategories.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class ProductCategoriesController {
  static async createProductCategories(req: Request, res: Response) {
    try {
      const ProductCategory = await ProductCategoriesService.createProductCategories(req.body);
      const response: ApiResponse = {
        success: true,
        message: "User Type created successfully",
        data: ProductCategory,
      };
      sendApiResponse(res, 201, response);
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating product category",
      });
    }
  }

  static async getProductCategories(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { productCategories, totalPages, totalCount } = await ProductCategoriesService.getProductCategories(page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All Product Categories",
          page,
          size,
          totalPages,
          totalCount,
          data: productCategories
        }
      );
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching product categories",
      });
    }
  }

  static async getProductCategoriesById(req: Request, res: Response): Promise<void> {
    try {
      const productCategory = await ProductCategoriesService.getProductCategoriesById(req.params.id);
      if (!productCategory) { sendApiResponse(res, 404, { success: false, message: "User not found", data: productCategory }); return;};
      sendApiResponse(res, 200, { success: true, message: "User Type Found", data: productCategory });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching product category",
      });
    }
  }

  static async updateProductCategories(req: Request, res: Response): Promise<void> {
    try {
      const productCategory = await ProductCategoriesService.updateProductCategories(req.params.id, req.body);
      if (!productCategory) { sendApiResponse(res, 404, { success: false, message: "User not found", data: productCategory }); return;};
      sendApiResponse(res, 200, { success: true, message: "Product category updated successfully", data: productCategory });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error updating product category",
      });
    }
  }

  static async deleteProductCategories(req: Request, res: Response) {
    try {
      const productCategory = await ProductCategoriesService.deleteProductCategories(req.params.id);
      if (!productCategory) { sendApiResponse(res, 404, { success: false, message: "User not found", data: productCategory }); return;};
      sendApiResponse(res, 200, { success: true, message: "Product categories deleted successfully", data: productCategory });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting product categories",
      });
    }
  }
}
