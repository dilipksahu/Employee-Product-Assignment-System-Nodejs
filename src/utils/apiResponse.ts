import { Response } from "express";

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  page?: number;
  size?: number;
  totalPages?: number;
  totalCount?: number;
}


export const sendApiResponse = (
  res: Response,
  statusCode: number,
  response: ApiResponse
) => {
  return res.status(statusCode).json(response);
};