import mongoose, { Model } from 'mongoose';
import { IDesignation, IDesignationModel } from './interface';
import { designationSchema } from './schema';
import { applyIndexes } from './indexes';
import { applyInstanceMethods } from './methods';
import { applyStaticMethods } from './statics';
import { applyMiddleware } from './middleware';

// Apply all enhancements to the schema
applyIndexes(designationSchema);
applyInstanceMethods(designationSchema);
applyStaticMethods(designationSchema);
applyMiddleware(designationSchema);

// Create and export the Designation model
const Designation: IDesignationModel = (mongoose.models.Designation ||
    mongoose.model<IDesignation, IDesignationModel>('Designation', designationSchema)) as IDesignationModel;

export default Designation;

// Export types for use in other files
export type { IDesignation, IDesignationModel } from './interface';
export { designationSchema } from './schema';
