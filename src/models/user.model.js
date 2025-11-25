import db from  '../../config/db.js';

export const selectAllUsers = async () =>{
    const [result] = await db.query('select * from users');
    return result;
}