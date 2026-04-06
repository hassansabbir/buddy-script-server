import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../app/config/index.js';
import { TUser, UserModel } from './user.interface.js';

const userSchema = new Schema<TUser, UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    nickname: { type: String, default: '' },
    address: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isOnline: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds),
  );
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomMessage = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

export const User = model<TUser, UserModel>('User', userSchema);
