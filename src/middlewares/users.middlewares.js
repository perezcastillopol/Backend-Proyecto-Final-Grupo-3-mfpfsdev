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

export const getNickName = async (req, res, next) => {
    let { name, last_name } = req.body;

    if (name) name = name.trim().toLowerCase();
    if (last_name) last_name = last_name.trim().toLowerCase();

    let nickname = "";

    if (name && last_name) {
        const randomPart = Math.random().toString(36).slice(2, 6);
        nickname = `${name}.${last_name}${randomPart}`;
    }

    req.body.nickname = nickname;
    next();
};