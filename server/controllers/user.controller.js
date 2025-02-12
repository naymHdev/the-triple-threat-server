import AsyncHandler from "../utils/catchAsync.js";


export const userGet = AsyncHandler((req,res) => {
  try {
    const user = req.user;
    return user;
  } catch (error) {
    throw error;
  }
});
