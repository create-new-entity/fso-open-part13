
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');
const { errorNames, errorMessages } = require('./errorHandler');
const { isTokenValid } = require('../controllers/login');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      req.decodedToken = jwt.verify(token, JWT_SECRET)
      const { id: userId } = req.decodedToken
      await isTokenValid(userId, token)
    }
    catch (e) {
      if(e.name === errorNames.tokenExpired) {
        return res.status(401).json({ error: errorMessages[errorNames.tokenExpired] });
      }
      return res.status(401).json({ error: errorMessages[errorNames.invalidToken] })
    }
  }  else {
    return res.status(401).json({ error: errorMessages[errorNames.tokenMissing] })
  }
  next()
};

module.exports = tokenExtractor;