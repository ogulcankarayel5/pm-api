const userDb = require("../../db/mongodb/user/user-db");

const getById = async (id) => {
  const user = await userDb.getById(id);
  return returnUser(user);
};

const getByEmail = async (email) => {
  const user = await userDb.findByEmail(email);
 
  return returnUser(user);
};
const findOne = async (credentials) => {
  const user = await userDb.findOne(credentials);
  return returnUser(user);
};

const returnUser = (user) => {
  if (user === null) {
    return null;
  }
  console.log("returnUser",user.email)
  return user;
};
module.exports = userService = { getById, getByEmail, findOne };
