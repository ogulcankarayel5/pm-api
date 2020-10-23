//import CustomError from '../../helpers/error/CustomError';
const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err,req,res,next) => {
    console.log(err.status)
    let customError=err;

    
   
    if(err.code==11000){
        customError = new CustomError(
            "Username veya email çoktan alınmış.Tekrar deneyin",
            400
          );
    }
    console.log(customError)
    res.status(customError.status || 500).json({
        success:false,
        errors:[customError.message]
    });
}

module.exports=customErrorHandler;
//export default customErrorHandler;