// import { registerDb,loginDb } from "../../db/mongodb/auth/auth-post.db";
// import CustomError from "../../helpers/error/CustomError";
// import { comparePassword } from "../../helpers/input/inputHelpers";
const authDb = require("../../db/mongodb/auth/auth-post.db");

const { comparePassword } = require("../../helpers/input/inputHelpers");
const {
  sendResetPasswordEmailWithToken,
} = require("../../helpers/libraries/sendEmail");
const auth = require("../../helpers/redis/auth");
/*
 * if you need to make calls to additional tables, data stores (Redis, for example),
 * or call an external endpoint , add them to this service
 */

const register = async (userInfo) => {
  return await authDb.register(userInfo);
};

const login = async (userInfo) => {
  const user = await authDb.login(userInfo);
  console.log(user);
  if (user === null) {
    return null;
  }
  if (comparePassword(userInfo.password, user.password)) {
    return user;
  }

  return null;
};

const forgotPassword = async (user) => {
  const resetToken = user.getResetTokenFromUser();
  await authDb.saveUser(user);
 await  sendResetPasswordEmailWithToken(resetToken, user.email);
};

const saveUserAfterResetPassword = async (email) => {
  await authDb.saveUserAfterResetPassword(email);
};

const changePasswordAndSaveUserAfterResetPassword = async (user,newPassword) => {
  await authDb.updatePassword(user,newPassword)
  await saveUserAfterResetPassword(user.email)
}

module.exports = authService = {
  register,
  login,
  forgotPassword,
  saveUserAfterResetPassword,
  changePasswordAndSaveUserAfterResetPassword
};
