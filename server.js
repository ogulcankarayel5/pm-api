
const express = require("express");
var cookieParser = require('cookie-parser')
const compression = require('compression');
const dotenv=require("dotenv");
const path=require("path");
const cors=require("cors");
const passport = require('passport');
const routers = require("./api/routes/index");
const customErrorHandler = require('./api/middlewares/errors/customErrorHandler')
const connectDatabase = require('./api/db/mongodb/connection');
//import express from "express";
// import dotenv from 'dotenv';
// import path from 'path';
// import cors from 'cors';
// import routers from "./api/routes/index";
// import customErrorHandler from './api/middlewares/errors/customErrorHandler';
// import connectDatabase from './api/db/mongodb/connection';
const app = express();



dotenv.config();

connectDatabase();
const PORT = process.env.PORT || 5000;
require('./api/services/passport/passport');


app.use(compression());
app.use(cookieParser())
app.use(express.json());
app.use(passport.initialize());
// our Express application to be able to receive requests from the host on which the Fetch API makes the calls 
app.use(cors({credentials:true,origin:true}));
// initalize passport

app.use("/api",routers);


//error handler
app.use(customErrorHandler);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
  }

app.listen(PORT,() => {
    console.log(`App started on ${PORT}`);
})

module.exports=app;
// export default app;