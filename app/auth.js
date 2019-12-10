const jwt = require('jsonwebtoken');
const secret = 'secret';

module.exports = (requiredRole) => (req, res, next) => {
  const { authorization } = req.headers;

  req.userInfo = null;
  req.authPassed = false;
  req.errorMessage = null;

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.substring(7);
    try {
      req.userInfo = jwt.verify(token, secret);
      req.authPassed = true;
      // A role is required that the user does not have
      if ((requiredRole === 'admin' && req.userInfo.sub !== 'admin_user')
       || (requiredRole === 'user' && req.userInfo.sub !== 'test_user')
       || (requiredRole && !['admin', 'user'].includes(requiredRole))) {
        req.authPassed = false;
        req.errorMessage = `User does not have the required role of '${requiredRole}'`;
      }
    } catch (e) {
      req.authPassed=false;
      req.errorMessage=e.message;
    }
  } else {
    req.errorMessage = 'Missing or malformed Authorization header';
  }

  next();
}
