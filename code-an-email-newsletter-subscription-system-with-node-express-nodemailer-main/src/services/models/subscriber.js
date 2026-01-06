import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribeToken: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.models.Subscriber ||
  mongoose.model('Subscriber', subscriberSchema);
