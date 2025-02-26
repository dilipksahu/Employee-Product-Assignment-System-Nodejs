import UserModel from "../model/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from "../type/user.type";

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export class UserService {
  static async createUser(userData: IUser) {
    try {
      console.log(userData);
      if (!userData.password || typeof userData.password !== "string") {
        throw new Error("Password must be a valid string");
      }

      console.log(userData.password, " type", typeof userData.password);
      const hashPassword = await bcrypt.hash(String(userData.password), 10);
      console.log("hashPassword", hashPassword);

      userData.password = hashPassword;
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      console.log("error", error);
    }

  }

  static async login(email: string, password: string): Promise<{ token: string, user: IUser }> {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, String(user.password));
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, user_type_id: user.user_type_id }, SECRET_KEY, { expiresIn: '1h' });
    await delete user.password;
    return { token, user };
  }

  static getAllUsers = async (page: number, size: number) => {
    const limit = size || 10; // Default page size is 10 if not provided
    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      UserModel.find()
        .populate({ path: "user_type_id", select: "type_name" })
        .populate({ path: "region_id", select: "name" })
        .populate({ path: "country_id", select: "name" })
        .populate({ path: "city_id", select: "name" })
        .skip(skip)
        .limit(limit)
        .exec(), // Ensure execution of the query
      UserModel.countDocuments()
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return { users, totalPages, totalCount };
  };

  static getUserById = async (id: String): Promise<IUser | null> => {
    return await UserModel.findById(id)
      .populate("user_type_id", "type_name")
      .populate("region_id", "name")
      .populate("country_id", "name")
      .populate("city_id", "name");
  };

  static getUserByEmail = async (email: String): Promise<IUser | null> => {
    return await UserModel.findOne({ email })
      .populate("user_type_id", "type_name")
      .populate("region_id", "name")
      .populate("country_id", "name")
      .populate("city_id", "name");
  };

  static updateUser = async (id: string, updates: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, updates, { new: true });
  };

  static deleteUser = async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
  };
}

