import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '@/interfaces';

export interface IEntry extends Entry {}

// export interface EntryDoc extends mongoose.Document {
//   description: string;
//   createdAt: number;
//   status: string;
// }

// interface IEntryModel extends mongoose.Model<EntryDoc> {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number, required: true },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in progress', 'finished'],
      message: '{VALUE} no es permitido',
    },
    default: 'pending',
  },
});

export const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);
