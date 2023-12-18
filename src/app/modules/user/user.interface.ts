import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};


export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id:string):Promise<TUser>
  isPasswordMatchd(planTextPassword:string,hashPassword:string):Promise<boolean>
}


export type TuserRole = keyof typeof USER_ROLE
