import { Request, Response } from "express";
import { UserDemoMappingService } from "../service/userDemoMapping.service";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";

export class UserDemoMappingController {

  static addUserDemoMapping = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDemoMapping = await UserDemoMappingService.createUserDemoMapping(req.body);
      const response: ApiResponse = {
        success: true,
        message: "User Demo Mapping created successfully",
        data: userDemoMapping,
      };
      sendApiResponse(res, 201, response);
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error creating user demo mapping",
      });
    }
  };

  static fetchUserDemoMappings = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { userDemoMappings, totalPages, totalCount } = await UserDemoMappingService.getAllUserDemoMappings(page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All user demo mapping",
          page,
          size,
          totalPages,
          totalCount,
          data: userDemoMappings
        }
      );
    } catch (error) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching user demo mapping",
      });
    }
  };

  static async fetchUserDemoMappingById(req: Request, res: Response): Promise<void> {
    try {
      const userDemoMapping = await UserDemoMappingService.getUserDemoMappingById(req.params.id);
      if (!userDemoMapping) { sendApiResponse(res, 404, { success: false, message: "User demo mapping not found", data: userDemoMapping }); return;};
      sendApiResponse(res, 200, { success: true, message: "User demo mapping found", data: userDemoMapping });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching user demo mapping",
      });
    }
  }

  static editUserDemoMapping = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDemoMapping = await UserDemoMappingService.updateUserDemoMapping(req.params.id, req.body);
      if (!userDemoMapping) { sendApiResponse(res, 404, { success: false, message: "User demo mapping not found", data: userDemoMapping }); return;};
      sendApiResponse(res, 200, { success: true, message: "User demo mapping updated successfully", data: userDemoMapping });
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error updating user demo mapping",
      });
    }
  };

  static removeUserDemoMapping = async (req: Request, res: Response): Promise<void> => {
    try {
      const userDemoMapping = await UserDemoMappingService.deleteUserDemoMapping(req.params.id);
      if (!userDemoMapping) { sendApiResponse(res, 404, { success: false, message: "User demo mapping not found", data: userDemoMapping }); return;};
      sendApiResponse(res, 200, { success: true, message: "User demo mapping Found", data: userDemoMapping });
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting user demo mapping",
      });
    }
  };

}