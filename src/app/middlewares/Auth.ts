import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config';
import { TuserRole } from '../modules/user/user.interface';

interface customRequest extends Request{
    user:JwtPayload
}

const auth = (...requiredRole:TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        // if the token is invalid 
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
        }
        // if the token is  valid
        jwt.verify(token,config.JWT_ACCESS_SECRET as string,function(err,decoded){
            if(err){
                throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
            }
            const role = (decoded as JwtPayload).role
            if(requiredRole && !requiredRole.includes(role)){
                throw new AppError(httpStatus.UNAUTHORIZED,'you are not authorized')
            }
            req.user = decoded as JwtPayload
            next()
        })
        
  });
};

export default auth;
