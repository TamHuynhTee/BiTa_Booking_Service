const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const { htmlEmailConfirm, htmlResetPassword } = require('../constant/confirmEmail');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((e) =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env', e)
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text = '', html = '') => {
  const msg = { from: config.email.from, to, subject, text, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Lấy lại mật khẩu';
  const resetPasswordUrl = `${config.frontEndUrl}/reset-password?token=${token}`;
  const html = htmlResetPassword(resetPasswordUrl, to);
  await sendEmail(to, subject, '', html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Xác thực tài khoản';
  const verificationEmailUrl = `${config.frontEndUrl}/verify-email?token=${token}`;
  const html = htmlEmailConfirm(verificationEmailUrl, to);
  await sendEmail(to, subject, '', html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
