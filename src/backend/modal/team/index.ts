import mongoose from 'mongoose';
import { ITeam, ITeamModel } from './interface';
import { teamSchema } from './schema';
import { applyInstanceMethods } from './methods';
import { applyStaticMethods } from './statics';
import { applyMiddleware } from './middleware';
import { applyIndexes } from './indexes';

// Apply all schema enhancements
applyInstanceMethods(teamSchema);
applyStaticMethods(teamSchema);
applyMiddleware(teamSchema);
applyIndexes(teamSchema);

// Create and export the Team model
export const Team = mongoose.model<ITeam, ITeamModel>('Team', teamSchema);

// Export types for use in other modules
export type { ITeam, ITeamModel } from './interface';
