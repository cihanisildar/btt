import mongoose, { Document, Schema } from 'mongoose';

export interface IPerson extends Document {
  tcKimlikNo: string;
  ad: string;
  soyad: string;
  kanGrubu: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonSchema = new Schema<IPerson>({
  tcKimlikNo: {
    type: String,
    required: [true, 'TC Kimlik No gereklidir'],
    unique: true,
    length: 11,
    match: /^[0-9]{11}$/
  },
  ad: {
    type: String,
    required: [true, 'Ad gereklidir'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  soyad: {
    type: String,
    required: [true, 'Soyad gereklidir'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  kanGrubu: {
    type: String,
    required: [true, 'Kan grubu gereklidir'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-']
  }
}, {
  timestamps: true
});

// TC Kimlik No için index (unique: true zaten index oluşturuyor)
// PersonSchema.index({ tcKimlikNo: 1 }); // Duplicate index - removed

// Arama için text index
PersonSchema.index({ ad: 'text', soyad: 'text' });

export default mongoose.models.Person || mongoose.model<IPerson>('Person', PersonSchema);
