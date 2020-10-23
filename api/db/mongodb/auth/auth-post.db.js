//import User from '../../../models/User';

const User = require('../../../models/User');
const userService = require('../../../services/user/user.service');

const register = async (userInfo) => {

    
    const user= await User.create(userInfo);
    return user;
   
}
const login = async (userInfo) => {
    const {email}=userInfo;
    return await User.findOne({email}).select("+password");
}


const saveUserAfterResetPassword = async (email) => {

    const filter = {email:email}
    const update = {resetPasswordToken:undefined,resetPasswordExpire:undefined}
    await User.findOneAndUpdate(filter,update,{upsert:true})
    

    // user.resetPasswordToken=undefined
    // user.resetPasswordExpire = undefined
 
}


const updatePassword = async (user,newPassword) => {
    
    //with findOneAndUpdate,pre("save") hook doesn't hash the password.
    user.password=newPassword
    await saveUser(user)

}



const saveUser = async (user) => {
    await user.save()
}




module.exports=authDb = {register,login,saveUserAfterResetPassword,saveUser,updatePassword};
//export {registerDb,loginDb};