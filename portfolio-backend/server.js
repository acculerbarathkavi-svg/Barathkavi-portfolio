const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 STEP 3 — Create transporter (VERY IMPORTANT)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "barathkavi001@gmail.com",       // your Gmail
        pass: "pbnr dfwa pqxu uogk"     // 16-char App Password
    }
});

// 🔹 API — receives contact form message
app.post("/contact", async (req, res) => {
    const { fullname, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: "yourgmail@gmail.com",      // your Gmail again
        subject: "New Contact Message",
        text: `
Name: ${fullname}
Email: ${email}
Phone: ${phone}

Message:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, msg: "Message Sent Successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "Something Went Wrong!" });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
