import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  description: string;
  author: string;
  ideas: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>({
  title: {
    type: String,
    required: [true, 'Başlık gereklidir'],
    trim: true,
    minlength: [3, 'Başlık en az 3 karakter olmalıdır'],
    maxlength: [100, 'Başlık en fazla 100 karakter olabilir']
  },
  description: {
    type: String,
    required: [true, 'Açıklama gereklidir'],
    trim: true,
    minlength: [10, 'Açıklama en az 10 karakter olmalıdır'],
    maxlength: [1000, 'Açıklama en fazla 1000 karakter olabilir']
  },
  author: {
    type: String,
    required: [true, 'Yazar adı gereklidir'],
    trim: true
  },
  ideas: [{
    type: Schema.Types.ObjectId,
    ref: 'Idea'
  }]
}, { 
  timestamps: true 
});

// Arama için text index
TopicSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema);
