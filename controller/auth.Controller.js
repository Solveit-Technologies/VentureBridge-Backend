import User from "../models/User.Model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token Generation Error:", error);
    throw new ApiError(
      500,
      "Something went wrong during generating Access and Refresh Token"
    );
  }
};
class AuthController {
  static signUp = tryCatchHandler(async (req, res) => {
    const { name, email, password, role, businessExperience } = req.body;
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
    });

    const createUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createUser) {
      throw new ApiError(500, "Server error while creating user");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createUser, "User Signup Successfully"));
  });

  static signIn = tryCatchHandler(async (req, res) => {
    const { email, name, password } = req.body;

    if (!email && !name) {
      throw new ApiError(400, "Email or Password are required ");
    }

    const user = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const correctPassword = await user.isPasswordCorrect(password);

    if (!correctPassword) {
      throw new ApiError(401, "User have wrong credential");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          "User sign in successfully "
        )
      );
  });
}

export default AuthController;
