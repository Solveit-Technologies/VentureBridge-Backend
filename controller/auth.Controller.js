import User from "../models/User.Model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";

class AuthController {
  static signIn = () => {};

  static signUp = tryCatchHandler(async (req, res) => {
    const { name, email, password, role, businessExperience, postedIdeas } =
      req.body;
    const existedUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User already exists", Error);
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role,
      businessExperience: businessExperience,
      postedIdeas: postedIdeas,
    });

    const createUser = await User
      .findById(user._id)
      .select("-password -refreshToken");

      if(!createUser){
        throw new ApiError(500,"Server error while creating user")
      }
    return res
      .status(201)
      .json(new ApiResponse(200, createUser, "User Signup Successfully"));
  });
}

export default AuthController;
