import mongoose from 'mongoose';

export default class SchemaTables {
   subscriberSchema  (){
    return new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    subscribedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    });
   }

    emailSchema(){
        return new mongoose.Schema({
        subject: { type: String, required: true },
        body: { type: String, required: true },
        sentAt: { type: Date, default: Date.now },
        sentTo: { type: [String], default: [] },
        status: { type: String, enum: ['sent', 'failed'], default: 'sent' }
        });
    } 
}

