const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
    },
});

const sendMail = async (to, subject, text, name) => {
    try {
        await transporter.sendMail({
            from: `"Uber" <nishkal0810@gmail.com>`,
            to,
            subject,
            html: `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <img src="https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2021/10/One-Uber-2021.png" />
      <h2>Welcome, ${name} 🚀</h2>
      <p>${text}<b>Uber Clone</b>. We're glad to have you on board!</p>
    </div>
  `,
        });
        console.log("✅ Email sent successfully");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = { sendMail };