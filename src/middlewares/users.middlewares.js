import {selectUserById} from '../models/user.model.js';

export const checkIdUser = async (req, res, next) => {
    const {userId} = req.params;
    if (isNaN(userId)){
        return res.status(400).json ({message: 'ID must be a number'})
    }
    const result = await selectUserById(userId);
    if (!result){
        return res.status (404).json({message: "User not found"});
    }
    req.user = result;
    next ();
}