import mongoose from 'mongoose';
import EmailService from './EmailService.js';
import {randomUUID} from 'crypto';
import SchemaTables from './schema.js';

export default class SubscriptionService extends EmailService {
  static SUBSCRIBERS = [];
  static PENDING_SUBSCRIBERS = [];
  static schemaTables = new SchemaTables();
  static Subscriber = mongoose.models.TIRZAHSUBSCRIBERS || mongoose.model('TIRZAHSUBSCRIBERS', SubscriptionService.schemaTables.subscriberSchema());
  /**
   * Adds an email address to the subscribers list.
   * Each user is represented by their id.
   * @param {*} email
   * @returns
   */

  async subscribeUser({ email, name = '', subscribedAt = new Date(), isActive = true }) {
    // Use existing model or create once

    const sub = new SubscriptionService.Subscriber({ email, name, subscribedAt, isActive });
    await sub.save();
    return sub;
  }

  

  async subscribe(email) {
    // First check if the user already exists
    const Eexists = await SubscriptionService.Subscriber.exists({ email });
    if (Eexists) {
      console.log('Subscriber already exists');
      return;
    }
    console.log('Subscriber does not exist');
    // Generate an ID
    const id = randomUUID();
    const newSubscriber = {
      id,
      email
    };
    await this.sendVerificationEmail(email, id);
  }

  /**
   * Unsubscribe a subscriber from the email list
   * @param {*} id
   * @param {*} email
   */
  async unsubscribe(id, email) {
    const result = await SubscriptionService.Subscriber.findOneAndDelete(
      { _id: id, email },
      { isActive: false },
      { new: true }
    );

    if (!result) {
      console.log('Subscriber not found or already unsubscribed', id, email);
      return false;
    }

    console.log('Subscriber unsubscribed:', email);
    return true;
  }

  /**
   * Verify a subscriber by their ID. If the ID is present inside the PENDING_SUBSCRIBERS
   * then the subscriber is added to the SUBSCRIBERS list.
   * @param {*} id
   * @param {*} email
   * @returns
   */
  async verifySubscriber(id, email) {
    if (!SubscriptionService.Subscriber) {
      console.log('Subscriber not verified', id, email);
    } else {
      console.log('Subscriber verified', id, email);

        const connected_sub = await this.subscribeUser({
          email: email,
          name: 'user_' + id,
          subscribedAt: new Date().toISOString(),
          isActive: true
        });
        if(connected_sub){
          console.log('Subscriber saved to DB', connected_sub);
        } else {
          console.log('Failed to save subscriber to DB');
          return null;
        }
    
    }
    return SubscriptionService.Subscriber;
  }
}
