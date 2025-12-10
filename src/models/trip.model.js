import db from  '../../config/db.js';

/***********************************************************GET****************************************/

export const selectAllTrips = async () =>{
    const [result] = await db.query('select * from trips');
    return result;
}

export const selectTripById = async (tripId) => {
    const [result] = await db.query ('select t.*, m.name as modality_name from trips t join modality m on t.modality_trip_id = m.id where t.id = ?', [tripId]);
    if (result.length === 0)return null;   
    return result [0];
}

export const selectTripsByUserId = async (userId) => {
    const [result] = await db.query('select t.*, m.name as modality_name from trips t join modality m on t.modality_trip_id = m.id where t.creator_id = ?  ', [userId]);
    return result;
}

export const selectTripsByModality = async (modalityId) => {
    const [result] = await db.query ('select * from trips where modality_trip_id= ?', [modalityId]);
    return result;
}


export const selectFilterTrips = async ({creator_id, title, modality_trip_id, start_date, end_date, status}) => {
    let sql = 'select * from trips where 1=1';
    const params = [];

    if (creator_id){
        sql += ' and creator_id = ?';
        params.push(creator_id);
    }

    if (title) {
        sql += ' and (title like ?';
        params.push(`%${title}%`);
        sql += ' or description like ?';
        params.push(`%${title}%`);
        sql += ')';
    }

    if (status) {
        sql += ' and status = ?';
        params.push(status);
    }

    if (modality_trip_id) {
        sql += ' and modality_trip_id = ?';
        params.push(modality_trip_id);
    }

    if (start_date && end_date) {
        sql += ' and start_date >= ? and end_date <= ?';
        params.push(start_date, end_date);
    } else {
        if (start_date) {
            sql += ' and start_date >= ?';
            params.push(start_date);
        }
        if (end_date) {
            sql += ' and end_date <= ?';
            params.push(end_date);
        }
    }
    const [result] = await db.query(sql, params);
    return result;
}



/***********************************************************INSERT*************************************/

export const insertTrip = async({creator_id, title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id, photo_url, num_participants})=>{
    const [result] = await db.query ('insert into trips (creator_id, title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id, photo_url, num_participants)values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[creator_id, title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id,photo_url, num_participants]);
    return result;
}
/***********************************************************DELETE****************************************/

export const deleteById = async (tripId) =>{
    const [result] = await db.query ('delete from trips where id=?', [tripId]);
    return result;
}
/***********************************************************UPDATE****************************************/

export const update = async (tripId, {title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id, photo_url, num_participants}) => {
    const [result] = await db.query('update trips set title = ?, description = ?, start_date= ?, end_date = ?, cost_per_person = ?, min_participants = ?, max_participants = ?, location = ?, transport= ?, itinerary = ?, status =?, modality_trip_id =?,  photo_url=?, num_participants=? where id = ?', [title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id, tripId, photo_url, num_participants]);
    return result;                                                                                                                                                                                                      
}
