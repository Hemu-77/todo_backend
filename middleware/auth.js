import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
  // 1. Read the token.
  const token = req.headers['authorization'];
  // console.log(authHeader);
  
// const token = authHeader && authHeader.split(' ')[1];

  console.log(token);
  // 2. if no token, return the error.
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // 3. check if token is valid.
  try {
    const payload = jwt.verify(
      token,
      'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz'
    );
    req.userID = payload.userID;
  } catch (err) {
    // 4. return error.
    console.log(err);
    return res.status(401).send('Unauthorized');
  }
  // 5. call next middleware
  next();
};

export default jwtAuth;