import db from  '../../config/db.js';

export const selectMsgByTrip= async (tripId) => {
    const [result] = await db.query ('select fm.*, u.nickname as user_nickname from forum_messages fm inner join users u on u.id = fm.user_id where fm.trip_id = ?', [tripId]);
    if (result.length === 0) return null;   
    return result;
}

export const selectMsgById = async (messageId) => {
    const [result] = await db.query ('select fm.*, u.nickname as user_nickname from forum_messages fm inner join users u on u.id = fm.user_id where fm.id = ?', [messageId]);
    if (result.length === 0) return null;   
    return result[0];
}

export const insertMsg = async ({trip_id, user_id,  content,parent_message_id}) => {
    const [result] = await db.query ('insert into forum_messages (trip_id,user_id,content,parent_message_id)values (?,?,?,?)',[trip_id, user_id,content,parent_message_id]);
    return result;
}