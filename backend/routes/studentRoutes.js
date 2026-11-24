const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../models/student");

router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: " All fields are requireds"
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "invalid email address"
            });

        };

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                message: "phone must contain 10 digits"
            });
        };

        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be at least 6 characters"
            });
        }

        const existingStudent = await Student.findOne({
            email: email.toLowerCase()
        });

        if (existingStudent) {
            return res.status(409).json({
                message: "email already registered"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({
            name, email: email.toLowerCase(), phone, password: hashedPassword
        });

        await newStudent.save();
        res.status(201).json({
            message: "student registered successfull."
        });

    } catch (error) {
        console.log("Registration Error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        res.status(500).json({
            message: error.message
        });
    }

});

module.exports = router;