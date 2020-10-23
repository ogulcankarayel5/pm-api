const { body, validationResult } = require("express-validator");

//must be login and register is different
const baseValidationRules = () => {
  return [
    body("email")
    
    .not()
    .isEmpty().withMessage("Please provide an email")
    .isEmail().withMessage("Please provide a valid email"),
    // password must be at least 5 chars long
    body("password")
      .not()
      .isEmpty().withMessage("Please provide a password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 5 chars long")
      
  ];
};


const extraValidationRules = () => {
  return [
    body("name")
    .not()
    .isEmpty().withMessage("Please provide a name")
    .isLength({min:2}).withMessage("Name must be at least 2 chars long")
  ]
}
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push( err.msg ));
  console.log( extractedErrors);
  return res.status(422).json({
    errors:extractedErrors,
  });
};

module.exports = {
  extraValidationRules,
  baseValidationRules,
  validate,
};
