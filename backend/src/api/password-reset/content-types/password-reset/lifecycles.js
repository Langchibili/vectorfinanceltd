// path: src/api/password-reset/content-types/password-reset/lifecycles.js

'use strict';

const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = {
  /**
   * beforeCreate: Validate payload, look up user, generate + save token+expiry.
   * Throw new Error(...) on failure so frontend sees it.
   */
  async beforeCreate(event) {
    const { data } = event.params;
    const rawEmail = data.email;

    if (!rawEmail) {
      throw new Error('Please provide an email address.');
    }

    const email = rawEmail.toLowerCase().trim();

    // 1) Find the user by email
    const user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { email } })

    if (!user) {
      throw new Error('No user found with that email.');
    }

    // 2) Generate a random token and an expiry (1 hour)
    const resetToken = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();

    // 3) Save token + expiry on the user record
    try {
      await strapi.entityService.update('plugin::users-permissions.user', user.id, {
        data: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: expiresAt,
        },
      });
    } catch (err) {
      console.error(`Error saving token for user ${user.id}: ${err}`);
      throw new Error('Failed to generate reset token. Please try again later.');
    }

    // 4) Attach token + expiresAt to the password-reset entry
    data.token = resetToken;
    data.expiresAt = expiresAt;
  },

  /**
   * afterCreate: Re-fetch the user to get the saved resetPasswordToken, then send an email
   * with a link containing only ?code=<token> (no email parameter).
   * Throw new Error(...) on failure so frontend sees a 500.
   */
  async afterCreate(event) {
    const { result } = event;
    const userEmail = result.email;

    // 1) Re-fetch the user to read resetPasswordToken
    let user;
    try {
      user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { email: userEmail.toLowerCase().trim() } });
    } catch (err) {
      console.error(`Error re-fetching user ${userEmail}: ${err}`);
      throw new Error('Failed to look up user for email sending.');
    }

    if (!user || !user.resetPasswordToken) {
      console.error(`User ${userEmail} has no resetPasswordToken.`);
      throw new Error('Reset token not found. Please try again.');
    }

    const resetToken = user.resetPasswordToken;

    // 2) Ensure CLIENTURL is set
    const clientUrl = process.env.CLIENTURL;
    if (!clientUrl) {
      console.error('CLIENTURL is not defined in .env. Cannot build reset link.');
      throw new Error('Server misconfiguration. Contact support.');
    }

    // 3) Build the reset link WITHOUT email query param
    const resetLink = `${clientUrl}/reset-password?code=${resetToken}`;

    // 4) Compose the email body
    const emailBody = `
Hello,

We received a request to reset your password. Click the link below to set a new password:
${resetLink}

If you did not request this, ignore this email. This link expires in one hour.

— Your Company Name
`;

    // 5) Create the Nodemailer transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: process.env.EMAILSERVICENAME, // e.g. "gmail"
        auth: {
          user: process.env.EMAILSERVICEUSERNAME,
          pass: process.env.EMAILSERVICEPASSWORD,
        },
        tls: {
          rejectUnauthorized: false, // allow self-signed certs if needed
        },
      });
    } catch (err) {
      console.error(`Error creating transporter: ${err}`);
      throw new Error('Failed to configure email service. Contact support.');
    }

    // 6) Send the email
    try {
      await transporter.sendMail({
        from: process.env.EMAILSERVICEUSERNAME,
        to: userEmail,
        subject: 'Reset Your Password',
        text: emailBody,
      });
      console.log(`Password reset email sent to ${userEmail}`);
    } catch (err) {
      console.error(`Error sending password reset email to ${userEmail}: ${err}`);
      throw new Error('Failed to send reset email. Please try again later.');
    }
  },
}
