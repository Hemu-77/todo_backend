import {UserModel} from './user.schema.js'

export default class userRepository{


    
    
    
    async signUp(user){
        console.log(typeof user);
        
        if (!user || typeof user !== 'object') {
            throw new Error("Invalid user data passed");
          }
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            console.log(err.message);
            throw err
            
        }
    }
}