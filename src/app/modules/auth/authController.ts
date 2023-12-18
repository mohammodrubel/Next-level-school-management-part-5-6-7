import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse"
import httpStatus from 'http-status';
import { authService } from "./authService";

const loginUser = catchAsync(async(req,res)=>{
    const result = await authService.loginUser(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User login is successfully',
        data:result
    })
})

export const authControllers = {
    loginUser
}