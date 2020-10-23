const User = require('../../../models/User');


const getById = async (id) => {


    const user = await User.findOne({_id:id})
    return user;


}

const findByEmail = async (email) => {
    const user = await User.findOne({email:email});
    
    return user;
}


const findOne = async (credentials) => {
    const user =await  User.findOne(credentials)
    return user
}



module.exports = userDb = {getById,findByEmail,findOne}