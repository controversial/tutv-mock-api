const jwt = require('jsonwebtoken');
const secret = 'secret';

module.exports = () => (req, res, next) => {
  const { authorization } = req.headers;

  req.userInfo = null;
  req.authPassed = false;
  req.errorMessage = null;

  if (authorization.startsWith('Bearer ')) {
    token = authorization.substring(7);
    try {
      req.userInfo = jwt.verify(token, secret);
      req.authPassed = true;
    } catch (e) {
      req.authPassed=false;
      req.errorMessage=e.message;
    }
  } else {
    req.errorMessage = 'Malformed Authorization header';
  }

  next();
}
