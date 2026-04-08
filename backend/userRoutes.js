const express = require('express');
const router = express.Router();
const User = require('./User');
const nodemailer = require("nodemailer");

// router.post('/register', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();

//         res.json({ message: "Saved successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

// router.post('/register', async (req, res) => {
//     try {
//         console.log("Incoming:", req.body);

//         const user = new User(req.body);
//         const savedUser = await user.save();

//         console.log("Saved:", savedUser); // 👈 ADD THIS

//         res.json({ message: "Saved successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// });

// POST REGISTER


// router.post('/register', async (req, res) => {
//     try {
//         const user = new User(req.body);

//         // ✅ Save to DB
//         const savedUser = await user.save();

//         // ✅ Email transporter
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "beetech.computer.lab@gmail.com",          // 🔁 your email
//                 pass: "alss dnng lusf wxpu"        // 🔁 app password (NOT normal password)
//             }
//         });

//         // ✅ Send email
//         await transporter.sendMail({
//             from: "beetech.computer.lab@gmail.com",
//             to: "ryn.lvy.low@gmail.com", // 🔁 where you want to receive notification
//             subject: "New Student Registration",
//             html: `
//                 <h2>New Registration</h2>
//                 <p><b>Name:</b> ${savedUser.student_name}</p>
//                 <p><b>Father:</b> ${savedUser.fathers_name}</p>
//                 <p><b>Phone:</b> ${savedUser.phone_number}</p>
//                 <p><b>Qualification:</b> ${savedUser.qualification}</p>
//             `
//         });

//         res.json({ message: "Saved & Email sent successfully" });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err.message });
//     }
// });

router.post('/register', async (req, res) => {
    try {
        console.log("Incoming:", req.body);

        const user = new User(req.body);
        const savedUser = await user.save();

        console.log("Saved:", savedUser);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "beetech.computer.lab@gmail.com",
                pass: "alssdnnglusfwxpu" // 🔥 IMPORTANT
            }
        });

        console.log("➡️ Sending email...");

        await transporter.sendMail({
            from: "beetech.computer.lab@gmail.com",
            to: "ryn.lvy.low@gmail.com",
            subject: "New Student Registration",
            html: `
                <h2>New Registration</h2>
                <p><b>Name:</b> ${savedUser.student_name}</p>
                <p><b>Father:</b> ${savedUser.fathers_name}</p>
                <p><b>Phone:</b> ${savedUser.phone_number}</p>
                <p><b>Qualification:</b> ${savedUser.qualification}</p>
                <p><b>Email:</b> ${savedUser.email}</p>
            `
        });

        await transporter.sendMail({
            from: "beetech.computer.lab@gmail.com",
            to: savedUser.email,
            subject: "Registration Successful",
            html: `
                <h2>Welcome to Bee Tech Lab 🎉</h2>
                <p>Hi ${savedUser.student_name},</p>
                <p>Your registration has been successfully received. ,<br> Thank you for registerting!</p>
            `
        });

        // console.log("✅ Email sent!");

        res.json({ message: "Thank you for registering! You'll receive a call shortly. Please hold on for a moment." });

    } catch (err) {
        console.error("❌ ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;