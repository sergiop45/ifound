const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function isAuthenticated(req, res, next) {
  
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).send('Token não fornecido.');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token inválido.');
    }
    req.user = decoded; 
    next();
  });

}

module.exports = isAuthenticated;
