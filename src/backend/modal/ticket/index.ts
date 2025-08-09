import mongoose from 'mongoose';
import { ITicket, ITicketModel } from './interface';
import { ticketSchema } from './schema';
import { applyInstanceMethods } from './methods';
import { applyStaticMethods } from './statics';
import { applyMiddleware } from './middleware';
import { applyIndexes } from './indexes';

// Apply methods, statics, middleware, and indexes
applyInstanceMethods(ticketSchema);
applyStaticMethods(ticketSchema);
applyMiddleware(ticketSchema);
applyIndexes(ticketSchema);

// Create and export the model
export const Ticket = mongoose.models.Ticket || mongoose.model<ITicket, ITicketModel>('Ticket', ticketSchema);
export * from './interface';
