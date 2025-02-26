import { Request, Response } from "express";
import { UserService } from "../service/user.service";
import { EditUserRequest } from "../type/user.type";
import { sendApiResponse, ApiResponse } from "../../../../utils/apiResponse";
import { SessionManagementService } from "../../../Activity/sessionManagement/service/sessionManagement.service";
import { IActivityLog } from '../../../Activity/activityLogs/type/activityLog.type';
import { ActivityLogService } from '../../../Activity/activityLogs/service/activityLog.service';

export class UserController {

  static async register(req: Request, res: Response) {
    try {
      console.log("req.body", req.body);

      const user = await UserService.createUser(req.body);
      sendApiResponse(res, 201, { success: true, message: 'User registered successfully', data: user });
    } catch (error: any) {
      sendApiResponse(res, 500, { success: false, message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      const sessionData = {
        lat: req.body.lat, // Get from request body or use a default
        log: req.body.log, // Get from request body or use a default
        ip: req.ip, // Get the user's IP address
        userId: String(result.user._id), // User ID from the validated user
        deviceType: req.body.deviceType || 'unknown', // Get from request body or use a default
      };

      const session = await SessionManagementService.createSession(sessionData);
      const user = result.user.toObject();
      user.session_id = String(session._id);
      result.user = user;
      sendApiResponse(res, 200, { success: true, message: 'Login successful', data: result });
    } catch (error: any) {
      sendApiResponse(res, 401, { success: false, message: error.message });
    }
  }

  static fetchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const size = parseInt(req.query.size as string) || 10; // Default page size is 10
      const { users, totalPages, totalCount } = await UserService.getAllUsers(page, size);
      sendApiResponse(res, 200,
        {
          success: true, message: "All Users",
          page,
          size,
          totalPages,
          totalCount,
          data: users
        }
      );
    } catch (error) {
      console.log("error", error);
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching users",
      });
    }
  };

  static async fetchUsersById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) { sendApiResponse(res, 404, { success: false, message: "User not found", data: user }); return; };
      sendApiResponse(res, 200, { success: true, message: "User Found", data: user });
    } catch (error: any) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error fetching user",
      });
    }
  }

  static editUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // const userId = req.params.userId; // Get the user ID from the request parameters
      const updatedData = req.body; // Get the updated data from the request body
      // const sessionId = req.body.session_id; // Get the session ID from the request body
      // const performedBy = req.user._id; // Assuming you have the logged-in user's ID in req.user

      const user = await UserService.updateUser(req.params.id, updatedData);
      if (!user) { sendApiResponse(res, 404, { success: false, message: "User not found", data: user }); return; };
      // Log the activity
      // const activityLog: IActivityLog = {
      //   session_id: sessionId,
      //   action: 'UPDATE',
      //   module: 'Users',
      //   performed_by: performedBy,
      //   target_id: userId,  
      // }
      // await ActivityLogService.createActivityLog(activityLog);

      sendApiResponse(res, 200, { success: true, message: "User Found", data: user });
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error updating user",
      });
    }
  };

  static removeUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user) { sendApiResponse(res, 404, { success: false, message: "User not found", data: user }); return; };
      sendApiResponse(res, 200, { success: true, message: "User Found", data: user });
    } catch (error) {
      sendApiResponse(res, 500, {
        success: false,
        message: "Error deleting user",
      });
    }
  };

}