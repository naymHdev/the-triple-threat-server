import catchAsync from "../../utils/catchAsync.js";
import sendRespone from "../../utils/SendResponse.js";
import user from "./user.model.js";
import httpStatus from "http-status";

const createUserIntoDB = catchAsync(async (req, res) => {
  const users = await user.create(req.body);
  sendRespone(res, {
    success: true,
    message: "User created successfully",
    data: users, // Use the correct variable here
    statusCode: httpStatus.OK,
  });
});

export const userController = {
  createUserIntoDB,
};
