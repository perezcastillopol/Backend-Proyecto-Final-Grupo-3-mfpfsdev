import db from  '../../config/db.js';

export const selectModalityById = async (modalityId) => {
    const [result] = await db.query ('select * from modality where id= ?', [modalityId]);
    if (result.length === 0)return null;   
    return result [0];
}

export const selectAllModalities = async () =>{
    const [result] = await db.query('select * from modality');
    return result;
}
