const express=require("express");
const cors= require("cors");
require("dotenv").config();
const app= express();
app.use(cors());
app.use(express.json());
app.use("/api/students", require("./routes/studentRoutes"))
// const studentRoutes= require("./routes/studentRoutes");

module.exports=app;