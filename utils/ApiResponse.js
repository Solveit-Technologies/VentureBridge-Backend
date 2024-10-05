class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
export {ApiResponse}

//adil  use this for response like
//    return res
//      .status(201)
//      .json(new ApiResponse(200, createdUser, "User registered Successfully"));