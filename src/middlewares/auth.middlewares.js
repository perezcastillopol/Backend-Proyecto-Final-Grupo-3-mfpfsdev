import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();

const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || 10;

export const hashPassword = async (req, res, next) =>{
    try {
        const { password_hash } = req.body;
        if (!password_hash) return next();
        req.body.password_hash = await bcrypt.hash(password_hash, BCRYPT_ROUNDS);
        next();
    } catch (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Error processing password' });
    }

}

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.sub;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
