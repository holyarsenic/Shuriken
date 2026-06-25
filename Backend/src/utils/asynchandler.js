const asyncHandler = (fnc) => async (req ,res ,next) =>{
  try {
    await fnc(req, res,next)
  } catch (error) {
    res.status(error.statusCode || 505).json({
      success: false,
      message: error.message
    })
  }
}

export {asyncHandler};