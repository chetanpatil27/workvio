import mongoose from 'mongoose';
import { ISprint, ISprintModel } from './interface';
import { sprintSchema } from './schema';
import * as sprintMethods from './methods';
import * as sprintStatics from './statics';
import * as sprintMiddleware from './middleware';
import { sprintIndexes } from './indexes';

// Add instance methods to schema
sprintSchema.methods.activate = sprintMethods.activate;
sprintSchema.methods.deactivate = sprintMethods.deactivate;
sprintSchema.methods.complete = sprintMethods.complete;
sprintSchema.methods.cancel = sprintMethods.cancel;
sprintSchema.methods.addGoal = sprintMethods.addGoal;
sprintSchema.methods.removeGoal = sprintMethods.removeGoal;
sprintSchema.methods.updateGoal = sprintMethods.updateGoal;
sprintSchema.methods.addTicket = sprintMethods.addTicket;
sprintSchema.methods.removeTicket = sprintMethods.removeTicket;
sprintSchema.methods.isInProgress = sprintMethods.isInProgress;
sprintSchema.methods.isCompleted = sprintMethods.isCompleted;
sprintSchema.methods.isCancelled = sprintMethods.isCancelled;
sprintSchema.methods.getDuration = sprintMethods.getDuration;
sprintSchema.methods.getRemainingDays = sprintMethods.getRemainingDays;
sprintSchema.methods.getProgress = sprintMethods.getProgress;

// Add static methods to schema
sprintSchema.statics.findByProject = sprintStatics.findByProject;
sprintSchema.statics.findByStatus = sprintStatics.findByStatus;
sprintSchema.statics.findByTicket = sprintStatics.findByTicket;
sprintSchema.statics.findActive = sprintStatics.findActive;
sprintSchema.statics.findCurrent = sprintStatics.findCurrent;
sprintSchema.statics.findUpcoming = sprintStatics.findUpcoming;
sprintSchema.statics.searchSprints = sprintStatics.searchSprints;
sprintSchema.statics.getSprintStats = sprintStatics.getSprintStats;

// Add middleware
sprintSchema.pre('validate', sprintMiddleware.preValidate);
sprintSchema.pre('save', sprintMiddleware.preSave);
sprintSchema.pre('find', sprintMiddleware.preFind);
sprintSchema.pre('findOne', sprintMiddleware.preFindOne);

// Add indexes
sprintIndexes.forEach(index => {
    sprintSchema.index(index);
});

// Create and export the model
export const Sprint = mongoose.model<ISprint, ISprintModel>('Sprint', sprintSchema);
export * from './interface';
