const randToken = require('rand-token')
const redisAuthHelper = require("../redis/auth");
const { refreshToken } = require('../../controllers/auth/auth-post.controller');


const responseUserWithTokens = (res,user) => {
  const { JWT_COOKIE, NODE_ENV,REFRESH_TOKEN } = process.env;
  const access_token = prepareJwtToken(user);
  console.log("access:" +access_token);
  const refresh_token = prepareRefreshToken(user);
  console.log("refresh: "+refresh_token);

  return res
  .status(200)
  .cookie(REFRESH_TOKEN, refresh_token, {
   //30d expire time 
    expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 30),
    secure:NODE_ENV === "development" ? false : true,
    httpOnly:true
    
    
  })
  .json({
    success: true,
    access_token: access_token,
    refresh_token: refresh_token,
    data: user,
  });


}

//must be releated id
const removeRefreshTokenForLogout = async (id) => {
   await redisAuthHelper.inValidateRefreshToken(JSON.stringify(id));
}

const prepareJwtToken = user => {

  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const token = user.generateJwtFromUser(JWT_SECRET_KEY,JWT_EXPIRE);
  return token;


}
const prepareRefreshToken = (user) => {
 
  const {JWT_REFRESH_SECRET_KEY,JWT_REFRESH_EXPIRE} = process.env;
  const refreshToken = user.generateJwtFromUser(JWT_REFRESH_SECRET_KEY,JWT_REFRESH_EXPIRE)
  
  
  redisAuthHelper.storeRefreshToken(refreshToken,user._id);
  return refreshToken;
}



const isTokenIncluded = (authorization) => {
  console.log(authorization)
  return authorization && authorization.startsWith('Bearer:');
  


}

const getAccessTokenFromHeader = authorization => {
  
  const access_token = authorization.split(":")[1];
  
  return access_token;
}

module.exports=tokenHelpers ={isTokenIncluded,getAccessTokenFromHeader,prepareRefreshToken,prepareJwtToken,responseUserWithTokens,removeRefreshTokenForLogout };
//export { sendJwt,isTokenIncluded,getAccessTokenFromHeader };
