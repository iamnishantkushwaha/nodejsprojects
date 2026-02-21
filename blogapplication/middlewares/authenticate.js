const { validatetoken } = require("../services/authentication");

function checkforauth(cookiename) {
  return (req, res, next) => {
    const tokenpresent = req.cookies[cookiename];
    if (!tokenpresent) return next();

    try {
      const userpayload = validatetoken(tokenpresent);
      console.log("payload", userpayload);
      req.user = userpayload;
      return next();
    } catch (error) {
      return next();
    }
  };
}
module.exports = { checkforauth };
