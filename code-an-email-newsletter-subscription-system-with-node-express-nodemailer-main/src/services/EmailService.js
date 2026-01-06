import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import SubscriptionService from './SubscriptionService.js';
dotenv.config();
export default class EmailService {
  static TRANSPORTER = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    secure: true
  });

  /**
   * Sends an email
   * @param {*} to
   * @param {*} subject
   * @param {*} text
   * @returns
   */
  #sendEmail(to, subject, html) {
    const email = {
      to,
      subject,
      html
    };
    return EmailService.TRANSPORTER.sendMail(email);
  }

  /**
   * Sends a verification email
   * @param {*} emailToVerify
   * @param {*} id
   */
  async  getAllSubscriberEmails() {
    const Subscriber = mongoose.models.TIRZAHSUBSCRIBERS || mongoose.model('TIRZAHSUBSCRIBERS', SubscriptionService.schemaTables.subscriberSchema());
   const subscribers = await Subscriber.find(
    { isActive: true },
    { email: 1 }
  ).lean();

  return subscribers.reduce((map, sub) => {
    map[sub._id.toString()] = sub.email;
    return map;
  }, {});
}
  async sendVerificationEmail(emailToVerify, id) {
    const VERIFICATION_HTML = `<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Welcome to Zoe-Tirzah</title><link href=https://fonts.googleapis.com rel=preconnect><link href=https://fonts.gstatic.com rel=preconnect crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"rel=stylesheet><body style="margin:0;padding:0;background-color:#ffff;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%"><table border=0 cellpadding=0 cellspacing=0 style=background-color:#ffff; width=100%><tr><td style="padding:40px 10px"align=center><table border=0 cellpadding=0 cellspacing=0 style="max-width:600px;background-color:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.05);border-collapse:separate"width=100%><tr><td height=8><tr><td style="padding:50px 40px 30px 40px"align=center><img alt="Zoe-Tirzah Logo"src=https://zoe-tirzah.netlify.app/images/logo/tirzah.png style=border-radius:50%;margin-bottom:25px;display:block width=80 height=80><h1 style="color:#2d4059;margin:0;font-size:34px;font-weight:400;letter-spacing:-1px;font-family:'Archivo Black',sans-serif;line-height:1.2">Verification Required.</h1><p style="color:#d4a373;font-size:14px;font-weight:600;margin-top:15px;text-transform:uppercase;letter-spacing:3px;font-family:'Archivo Black',sans-serif">A Final Step Toward Delight<tr><td style="padding:0 50px 40px 50px;color:#4a4a4a;line-height:1.8;font-size:16px;text-align:left"><p style=margin-bottom:20px>Dear Prospective Subscriber,<p style=margin-bottom:20px>We are formally acknowledging your request to join the <strong>Zoe-Tirzah</strong> newsletter rollout. As a brand rooted in the philosophy of "Zoe" for life and "Tirzah" for delight, we take great care in ensuring that our digital presence is as intentional and refined as our mission suggests.<p style=margin-bottom:20px>To maintain the security of our community and to ensure this invitation reached the correct recipient, we kindly ask you to confirm your intent to subscribe. By verifying your email, you authorize us to provide you with exclusive insights into our world of curated inspiration and balanced living.<table border=0 cellpadding=0 cellspacing=0 style="margin:40px 0"width=100%><tr><td align=center><a href='${process.env.URL}/subscriber/verify?id=${id}&email=${emailToVerify}' style="background-color:#2d4059;color:#fff;padding:18px 40px;border-radius:30px;display:inline-block;font-weight:600;text-decoration:none;font-size:16px;letter-spacing:1px;box-shadow:0 4px 10px rgba(45,64,89,.2)">Confirm Subscription</a></table><p style=margin-bottom:20px>Once confirmed, you will be officially integrated into our premier distribution list<p style="margin-top:30px;font-style:italic;font-size:14px;color:#888;border-top:1px solid #eee;padding-top:20px">Note: If you did not initiate this request, please disregard this communication. No further actions will be taken, and your privacy will remain uncompromised.<p style=margin-top:40px;margin-bottom:0>With distinguished regards,<p style=margin-top:5px;font-weight:700;color:#2d4059>The Zoe-Tirzah Editorial Team<tr><td style="padding:30px;background-color:#fafafa;border-top:1px solid #f0f0f0"align=center><p style=margin:0;font-size:12px;color:#999;letter-spacing:1px;text-transform:uppercase>© 2026 Zoe-Tirzah. All Rights Reserved.</table></table>`;
 
    await this.#sendEmail(emailToVerify, 'ZOE-TIRZAH - Verify Your Email', VERIFICATION_HTML);
    console.log('Verification email sent to ' + emailToVerify);
  }

  /**
   * Loops through the subscriber list and sends each email
   * @param {*} subject
   * @param {*} body
   */
  async sendBulkEmail(subject, body) {
    body = `<!doctypehtml><html lang=en><meta charset=UTF-8><title>Welcome to Our Missions Newsletter</title><body style=margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif><table cellpadding=0 cellspacing=0 style=background-color:#f4f6f8;padding:20px+0 width=100%><tr><td align=center><table cellpadding=0 cellspacing=0 style=background-color:#fff;border-radius:6px;overflow:hidden width=600><tr><td><img alt="Missions and Faith"src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80"style=width:100%;display:block;border-radius:16px><tr><td style=padding:30px;color:#333><h1 style="margin:0 0 15px 0;font-size:26px;color:#dc143c;text-align:center">Welcome to the Mission Family 🤍</h1><p style="font-size:15px;line-height:1.7;margin:0 0 15px 0">We are truly delighted to welcome you as an official member of our missions newsletter. Your decision to join this community is more than a subscription—it is a step into a shared calling, a shared burden, and a shared hope rooted in Christ.<p style="font-size:15px;line-height:1.7;margin:0 0 15px 0">Our newsletter exists to keep you closely connected to what God is doing through missions—locally and across nations. Here, we share stories of faith, testimonies from the field, mission updates, prayer points, and reflections that stir hearts toward the Great Commission.<p style="font-size:15px;line-height:1.7;margin:0 0 15px 0">As Scripture reminds us, <em>“How beautiful are the feet of those who bring good news.”</em> Through this newsletter, you walk with missionaries, churches, and believers who carry that good news into towns, villages, campuses, and homes.<p style="font-size:15px;line-height:1.7;margin:0 0 15px 0">You will receive updates about ongoing mission outreaches, upcoming programs, opportunities to pray, give, and serve, and inspiring insights that strengthen faith and vision. Whether you are called to go, to give, or to intercede, your place in this mission matters.<p style=font-size:15px;line-height:1.7;margin:0>Thank you for standing with us. May this newsletter continually encourage your heart, deepen your faith, and remind you that you are part of God’s work in reaching the world with His love.<tr><td style=background-color:#2b5d34;padding:20px;text-align:center;color:#fff><p style="margin:0 0 10px 0;font-size:14px">Stay connected with us<a href=https://www.facebook.com/AZWC17 style=color:#fff;text-decoration:none;margin:0+10px;font-size:14px>Facebook</a> <a href=https://www.instagram.com/tac_zoe style=color:#fff;text-decoration:none;margin:0+10px;font-size:14px>Instagram</a> <a href=https://www.tiktok.com/@tac_zoe style=color:#fff;text-decoration:none;margin:0+10px;font-size:14px>Tiktok</a><p style="margin:15px 0 0 0;font-size:12px;opacity:.8">© 2026 Missions Organization • Proclaiming Christ, Transforming Lives</table></table>`;
    const emails = await this.getAllSubscriberEmails();
    const emailList = Object.entries(emails).map(([id, email]) => ({id,email}));
    console.log(emailList.length);
      await Promise.allSettled(
      emailList.map(({ id, email }) => {
        const bodyWithUnsubscribe =`${body}<br/><br/><table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:20px auto;"><tr><td align="center" bgcolor="#d9534f" style="border-radius:4px;"><a href="${process.env.URL}/subscriber/unsubscribe?id=${id}&email=${email}"target="_blank"style="font-size:14px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;padding:10px 20px;display:inline-block;">Unsubscribe</a></td></tr></table>`;

        return this.#sendEmail(email, subject, bodyWithUnsubscribe);
      })
    );
    
  }
}