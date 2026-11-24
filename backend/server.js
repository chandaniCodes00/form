// const express= require("express");
// const app= require("./app");
// const connectDB= require("./config/db");
// connectDB();
//  app.listen(5000, ()=>
// {
//     try{
//     console.log("server running on port 5000");
//     }
//     catch(error)
//     {
//         console.log("server  error", error);
//     }
// })

const app = require("./app");
const connectDB = require("./config/db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (error) {
    console.log("Server error:", error.message);
  }
};

startServer();
