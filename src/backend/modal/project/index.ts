import mongoose, { Model } from 'mongoose';
import { IProject, IProjectModel } from './interface';
import { projectSchema } from './schema';
import { applyIndexes } from './indexes';
import { applyInstanceMethods } from './methods';
import { applyStaticMethods } from './statics';
import { applyMiddleware } from './middleware';

// Apply all enhancements to the schema
applyIndexes(projectSchema);
applyInstanceMethods(projectSchema);
applyStaticMethods(projectSchema);
applyMiddleware(projectSchema);

// Create and export the Project model
const Project: IProjectModel = (mongoose.models.Project ||
    mongoose.model<IProject, IProjectModel>('Project', projectSchema)) as IProjectModel;

export default Project;

// Export types for use in other files
export type { IProject, IProjectModel } from './interface';
export { projectSchema } from './schema';
