import { TUser } from './user.interface.js';
import { User } from './user.model.js';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateOnlineStatus = async (id: string, status: boolean) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isOnline: status },
    { new: true },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateOnlineStatus,
};
