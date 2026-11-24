const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true

        },
        phone: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    });


    // student is collection inside the database in mongodb
    module.exports=mongoose.model("student", studentSchema);