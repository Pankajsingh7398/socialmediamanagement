import mongoose, { Schema, Document } from 'mongoose';

export interface IFeatureRequest extends Document {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  featureTitle: string;
  featureDescription: string;
  priority: 'low' | 'medium' | 'high';
  timeline?: string;
  budget?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeatureRequestSchema = new Schema<IFeatureRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    featureTitle: { type: String, required: true },
    featureDescription: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    timeline: { type: String },
    budget: { type: String },
  },
  { timestamps: true }
);

export const FeatureRequest = mongoose.model<IFeatureRequest>('FeatureRequest', FeatureRequestSchema);
