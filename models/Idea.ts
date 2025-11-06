import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IIdea extends Document {
  topic: Types.ObjectId;
  author?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const IdeaSchema = new Schema<IIdea>({
  topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
  author: { type: String, trim: true, maxlength: 100 },
  content: { type: String, required: true, trim: true, maxlength: 2000 },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Idea || mongoose.model<IIdea>('Idea', IdeaSchema);
