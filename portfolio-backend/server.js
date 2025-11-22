const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// Email setup
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "barathkavi22@gmail.com",      // your gmail
        pass: "pbnr dfwa pqxu uogk"         // special password
    }
});

// API
app.post("/contact", async (req, res) => {
    const { fullname, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: "barathkavi22@gmail.com",
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
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
