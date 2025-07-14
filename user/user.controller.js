import userRepository from "./user.repo.js";
import jwt from 'jsonwebtoken'

export default class UserController {
  constructor() {
    this.userRepository = new userRepository();
  }

  async signUp(req, res, next) {
    const { name, email, password } = req.body;
    console.log("Incoming body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const user = await this.userRepository.signUp({ name, email, password });
       
        
      const token = jwt.sign(
      {
      userID: user._id,
      email: user.email,
    },
    'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
    {
      expiresIn: '1h',
    }
  );
  return res.status(200).send(token);
      
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
          }
      next(err);
    }
  }
}
