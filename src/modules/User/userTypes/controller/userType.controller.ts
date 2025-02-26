import { Request, Response } from "express";
import { UserTypeService } from "../service/userType.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class UserTypeController {
  static async createUserType(req: Request, res: Response) {
    try {
      const userType = await UserTypeService.createUserType(req.body);
      const response: ApiResponse = {
        success: true,
        message: "User Type created successfully",
        data: userType,
      };
      sendApiResponse(res, 201, response);
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating user type",
      });
    }
  }

  static async getUserTypes(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { userTypes, totalPages, totalCount } = await UserTypeService.getUserTypes(page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All User Types",
          page,
          size,
          totalPages,
          totalCount,
          data: userTypes
        }
      );
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching user types",
      });
    }
  }

  static async getUserTypeById(req: Request, res: Response): Promise<void> {
    try {
      const userType = await UserTypeService.getUserTypeById(req.params.id);
      if (!userType) { sendApiResponse(res, 404, { success: false, message: "User not found", data: userType }); return;};
      sendApiResponse(res, 200, { success: true, message: "User Type Found", data: userType });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching user type",
      });
    }
  }

  static async updateUserType(req: Request, res: Response): Promise<void> {
    try {
      const userType = await UserTypeService.updateUserType(req.params.id, req.body);
      if (!userType) { sendApiResponse(res, 404, { success: false, message: "User not found", data: userType }); return;};
      sendApiResponse(res, 200, { success: true, message: "User type updated successfully", data: userType });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error updating user type",
      });
    }
  }

  static async deleteUserType(req: Request, res: Response) {
    try {
      const userType = await UserTypeService.deleteUserType(req.params.id);
      if (!userType) { sendApiResponse(res, 404, { success: false, message: "User not found", data: userType }); return;};
      sendApiResponse(res, 200, { success: true, message: "User type deleted successfully", data: userType });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting user type",
      });
    }
  }
}
