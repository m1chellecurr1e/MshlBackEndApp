import nodemailer from 'nodemailer'

// Create your account at: https://ethereal.email/
// Mailbox for below account is available at: https://ethereal.email/messages
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'charlie.okon@ethereal.email',
      pass: 'uYrVhbwaFy1T757W2e'
  }
});

transporter.sendMail({
  from: '"Michelle Currie👻" <michelle@curaite.health>', // sender address
  to: "participant-bootcamp@test.com", // list of receivers
  subject: "Hello from FHIR Bootcamp APP FOUR 🔥", // Subject line
  html: "Your Patient Camila Lopez is <b>completely fine</b>.<br/>Or <em>is she?</em>", // html body
}).then(info => console.log(info))