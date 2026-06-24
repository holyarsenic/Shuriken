import { asyncHandler } from "../utils/asynchandler.js";

const registerUser = asyncHandler( async(res, req) => {
  res.status(200).json({
    message: "ok"
  })
})

export {registerUser};