import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceRequest extends Document {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  serviceType: string;
  clientType: 'brand' | 'customer';
  projectDescription: string;
  budget?: string;
  timeline?: string;
  additionalInfo?: string;
  // Service-specific fields
  websiteType?: string; // for web dev
  appPlatform?: string; // for app dev
  marketingGoal?: string; // for digital marketing
  socialPlatforms?: string[]; // for social media
  targetKeywords?: string[]; // for SEO
  influencerNiche?: string; // for influencer marketing
  prObjective?: string; // for PR marketing
  memeStyle?: string; // for meme marketing
  createdAt: Date;
  updatedAt: Date;
}

const ServiceRequestSchema = new Schema<IServiceRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String, required: true },
    serviceType: { type: String, required: true },
    clientType: { type: String, enum: ['brand', 'customer'], required: true },
    projectDescription: { type: String, required: true },
    budget: { type: String },
    timeline: { type: String },
    additionalInfo: { type: String },
    // Service-specific fields
    websiteType: { type: String },
    appPlatform: { type: String },
    marketingGoal: { type: String },
    socialPlatforms: [{ type: String }],
    targetKeywords: [{ type: String }],
    influencerNiche: { type: String },
    prObjective: { type: String },
    memeStyle: { type: String },
  },
  { timestamps: true }
);

export const ServiceRequest = mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);
