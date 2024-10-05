import User from "../models/User.Model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";

class AuthController {
  static signIn = () => {};

  static signUp = tryCatchHandler(async (req, res) => {
    const { name, email, password, role, businessExperience } = req.body;
    const existedUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User already exists",Error);
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role,
      businessExperience: businessExperience,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, user, "User Signup Successfully"));
  });
}

export default AuthController;
