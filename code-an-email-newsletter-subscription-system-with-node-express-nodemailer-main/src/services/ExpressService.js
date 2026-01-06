import express from 'express';
import cors from 'cors';
import SubscriptionService from './SubscriptionService.js';
import EmailService from './EmailService.js';

export default class ExpressService {
  static PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;

  #app;
  #subscribeRouter;

  constructor() {
    this.#app = express();
    this.#subscribeRouter = express.Router();
  }

  #initialize() {
    this.#app.use(cors({
      origin: 'http://127.0.0.1:5500',
      methods: ['POST', 'OPTIONS'],
    }));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({extended: true}));
    this.#app.use('/subscriber', this.#subscribeRouter);
    
  }

  #addLoggingMiddleware() {
    this.#app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`, req.body);
      console.log('VERIFIED', SubscriptionService.SUBSCRIBERS);
      console.log('PENDING', SubscriptionService.PENDING_SUBSCRIBERS);
      return next();
    });
  }

  /**
   * Adds a subscriber to the pending subscribers. The email used to register
   * is then sent an email for verification.
   */
  #addSubscribeRoute() {
    this.#subscribeRouter.post('/add', async (req, res, next) => {
      try {
        const {email} = req.body;
        if (!email) {
          return res.status(400).send('Invalid request');
        }
        const subscriptionService = new SubscriptionService();
        await subscriptionService.subscribe(email);
        return res.status(200).send(`<div style="max-width: 500px; margin: 40px auto; padding: 30px; background-color: #ffffff; border: 1px solid #faedcd; border-radius:16px;box-shadow:010px25pxrgba(212,163,115,0.1);text-align:center;font-family:'SegoeUI',Roboto,Helvetica,Arial,sans-serif;"><divstyle="font-size:40px;margin-bottom:20px;">✉️</div><h2style="color:#2d4059;margin:0010px0;font-size:24px; font-weight: 700; letter-spacing: -0.5px;">Verify Your Email</h2><p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">A moment of delight awaits. Please check your inbox and click the verification link to join the <strong>Zoe-Tirzah</strong> rollout.</p><div style="height: 2px; width: 60px; background: linear-gradient(to right, #d4a373, #faedcd); margin: 0 auto 25px auto; border-radius: 2px;"></div><p style="color: #999; font-size: 13px; margin: 0;">Can't find it? Check your spam folder or <a href="#" style="color: #d4a373; text-decoration: none; font-weight: 600;">click here to resend</a>.</p></div>`);
      } catch (err) {
        console.error('Erorr adding subscriber', err);
        return next(err);
      }
    });
  }

  /**
   * Add a route to unsubscribe a user from the email list
   */
  #addUnsubscribeRoute() {
    this.#subscribeRouter.get('/unsubscribe', async (req, res, next) => {
      try {
        const {id, email} = req.query;
        if (!id || !email) {
          return res.status(400).send('<div style="max-width:500px;margin:40px auto;padding:40px;background-color:#fff;border:1px solid #fceaea;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,.05);text-align:center;font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif"><div style=font-size:32px;margin-bottom:20px;color:#d9534f>✨</div><h2 style="color:#2d4059;margin:0 0 10px 0;font-size:24px;font-weight:700;letter-spacing:-.5px">Invalid Request</h2><p style="color:#666;font-size:16px;line-height:1.6;margin:0 0 25px 0">We apologize, but it appears this link is no longer valid or has expired. This often happens if the link has already been used or if the request has timed out for your security.<div style=margin-bottom:25px><a href=# style="background-color:#2d4059;color:#fff;padding:12px 24px;border-radius:30px;display:inline-block;font-weight:600;text-decoration:none;font-size:14px">Return to Homepage</a></div><div style="height:1px;width:60px;background-color:#d4a373;margin:0 auto 20px auto"></div><p style=color:#999;font-size:13px;margin:0>Need further assistance? Please <a href=mailto:support@zoe-tirzah.com style=color:#d4a373;text-decoration:none;font-weight:600>contact our team</a> to resolve this.</div>');
        }
        const subscriptionService = new SubscriptionService();
        subscriptionService.unsubscribe(id, email);
        return res.status(200).send('<div style="max-width:500px;margin:40px auto;padding:40px;background-color:#fff;border:1px solid #f0f0f0;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,.05);text-align:center;font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif"><div style=font-size:32px;margin-bottom:20px>🌿</div><h2 style="color:#2d4059;margin:0 0 10px 0;font-size:24px;font-weight:700;letter-spacing:-.5px">We’re sorry to see you go.</h2><p style="color:#666;font-size:16px;line-height:1.6;margin:0 0 25px 0">Your request to unsubscribe from the <strong>Zoe-Tirzah</strong> newsletter has been processed. We wish you nothing but life and delight on your journey.<div style=height:1px;width:100%;background-color:#f8f8f8;margin-bottom:25px></div><p style=color:#999;font-size:14px;margin-top:-8;margin-bottom:-8>Did you click this by mistake?<br><a href=# style=color:#d4a373;text-decoration:none;font-weight:bold;display:inline-block;margin-top:-8>Click here to stay subscribed</a></div>');
      } catch (err) {
        console.error('Erorr unsubscribing', err);
        return next(err);
      }
    });
  }

  /**
   * Add a route to verify the user's email
   */
  #addVerifyRoute() {
    this.#subscribeRouter.get('/verify', async (req, res, next) => {
      try {
        const {id, email} = req.query;
        if (!id || !email) {
          return res.status(400).send('Invalid request');
        }
        const subscriptionService = new SubscriptionService();
        await subscriptionService.verifySubscriber(id, email);
        return res.status(200).send(`
                <p>Email verified! Redirecting...</p>
                <script>
                  setTimeout(() => {
                    window.location.href = "https://website.com";
                  }, 2000);
                </script>
              `);
      } catch (err) {
        console.error('Erorr verifying', err);
        return next(err);
      }
    });
  }

  /**
   * Add a route to send an email to all the subscribers
   */
  #addSendEmailRoute() {
    this.#subscribeRouter.post('/send', async (req, res, next) => {
      try {
        const {body, subject, password} = req.body;
        if (!body || !subject || !password) {
          return res.status(404).send('Not found');
        }
        if (password !== process.env.PASSWORD) {
          return res.status(404).send('An error occurred');
        }
        const emailService = new EmailService();
        await emailService.sendBulkEmail(subject, body);
        return res.status(200).send('Emails sent to subscribers');
      } catch (err) {
        console.error('Erorr sending email', err);
        return next(err);
      }
    });
  }

  start() {
    this.#initialize();
    this.#addLoggingMiddleware();
    this.#addSubscribeRoute();
    this.#addUnsubscribeRoute();
    this.#addVerifyRoute();
    this.#addSendEmailRoute();
    this.#app.listen(ExpressService.PORT, () => {
      console.log(`Server running on port ${ExpressService.PORT}`);
    });
  }

}