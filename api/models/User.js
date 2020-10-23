// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const crypto = require("crypto")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique:true,
    required:[true,"Please provide a name"]
    
  },
  email: {
    type: String,
    unique:true,
    required:[true,"Please provide an email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    
    //bilgileri çektiğimiz zaman password görünmeyecek
    select: false,
  },
  googleId:{
    type:String
  },
  resetPasswordToken:{
    type:String
  },
  resetPasswordExpire:{
    type:Date
  }

});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


UserSchema.methods.getResetTokenFromUser = function() {
  const {RESET_PASSWORD_EXPIRE}=process.env
  const randomHexString = crypto.randomBytes(16).toString("hex")
  
  const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex")
 

  this.resetPasswordToken=resetPasswordToken
  this.resetPasswordExpire=Date.now()+parseInt(RESET_PASSWORD_EXPIRE)
  return resetPasswordToken
}
UserSchema.methods.generateJwtFromUser = function (secretKey,expireTime) {
  

  const payload = {
    id: this._id,
    name: this.name,
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: expireTime,
  });

  console.log(jwt.decode(token).exp);

  return token;
};

module.exports=mongoose.model("User", UserSchema);

//export default mongoose.model("User", UserSchema);
