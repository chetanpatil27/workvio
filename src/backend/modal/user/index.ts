import mongoose, { Model } from 'mongoose';
import { IUser, IUserModel } from './interface';
import { userSchema } from './schema';
import { applyIndexes } from './indexes';
import { applyInstanceMethods } from './methods';
import { applyStaticMethods } from './statics';
import { applyMiddleware } from './middleware';

// Apply all enhancements to the schema
applyIndexes(userSchema);
applyInstanceMethods(userSchema);
applyStaticMethods(userSchema);
applyMiddleware(userSchema);

// Create and export the User model
const User: IUserModel = (mongoose.models.User ||
    mongoose.model<IUser, IUserModel>('User', userSchema)) as IUserModel;

export default User;

// Export types for use in other files
export type { IUser, IUserModel } from './interface';
export { userSchema } from './schema';
