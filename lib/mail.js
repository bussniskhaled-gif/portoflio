import nodemailer from 'nodemailer'

// Centralised mail configuration, read from environment variables.
// Next.js loads `.env` automatically — never commit real credentials.

// Gmail's submission port hosts differ in how TLS starts: 465 is
// implicit TLS, 587 starts in plaintext and upgrades with STARTTLS.
const smtpPort = Number(process.env.SMTP_PORT) || 465

export const mailConfig = {
  // The address the contact-form messages are sent TO.
  toEmail: process.env.CONTACT_TO_EMAIL || 'ka6246770@gmail.com',

  // Nodemailer SMTP transport options for Gmail.
  // Requires a 16-character Google "App Password" — not your normal password.
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER, // e.g. yourname@gmail.com
      pass: process.env.SMTP_PASS, // the App Password (16 chars, no spaces)
    },
  },
}

// Build the SMTP transport once. Created lazily so the server can start
// even when credentials aren't configured yet.
let transporter = null
export function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport(mailConfig.smtp)
  return transporter
}

// Escape user input before injecting into HTML.
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Collapse a value to one line before it reaches a mail header.
// A raw "\n" in the subject or reply-to would let a visitor inject
// extra SMTP headers.
export function singleLine(value) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim()
}

// Validate the incoming form payload. Values are coerced to strings
// first: a JSON body can send numbers or objects, and calling
// `.trim()` on those would throw instead of returning a 400.
export function validate({ name, email, message } = {}) {
  const errors = {}
  const safeName = typeof name === 'string' ? name.trim() : ''
  const safeEmail = typeof email === 'string' ? email.trim() : ''
  const safeMessage = typeof message === 'string' ? message.trim() : ''

  if (!safeName) errors.name = 'Please enter your name.'
  else if (safeName.length > 120) errors.name = 'Name is too long (max 120 characters).'

  if (!safeEmail) errors.email = 'Please enter your email.'
  else if (safeEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail))
    errors.email = 'Enter a valid email.'

  if (!safeMessage) errors.message = 'Please enter a message.'
  else if (safeMessage.length < 5)
    errors.message = 'Message must be at least 5 characters.'
  else if (safeMessage.length > 5000)
    errors.message = 'Message is too long (max 5000 characters).'

  return errors
}