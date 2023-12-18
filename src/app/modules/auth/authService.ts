import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TloginUser } from './authInterface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from '../../config';

const loginUser = async (payload: TloginUser) => {
  // if the user and password is exist
  const user = await User.isUserExistByCustomId(payload.id);
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this User is Deleted');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this User is blocked');
  }

  if (!(await User.isPasswordMatchd(payload?.password, user?.password))){
    throw new AppError(httpStatus.FORBIDDEN, 'password did not match!');
  }
const jwtPayload ={
    userId : user.id,
    role:user.role
} 
  const accessToken = jwt.sign(
    jwtPayload,config.JWT_ACCESS_SECRET as string,{expiresIn:'20d'}
  )

  return {
    accessToken,
    needsPasswordChange :user?.needsPasswordChange
  }



};

export const authService = {
  loginUser,
};
