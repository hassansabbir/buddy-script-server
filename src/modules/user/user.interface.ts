import { Model } from 'mongoose';

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profileImage?: string;
  role: 'user' | 'admin';
  isOnline: boolean;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByCustomMessage(email: string): Promise<TUser | null>;
}
