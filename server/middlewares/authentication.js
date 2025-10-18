
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');
const { errorNames, errorMessages } = require('./errorHandler');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
    }
    catch {
      return res.status(401).json({ error: errorMessages[errorNames.invalidToken] })
    }
  }  else {
    return res.status(401).json({ error: errorMessages[errorNames.tokenMissing] })
  }
  next()
};

module.exports = tokenExtractor;