import db from  '../../config/db.js';

export const selectAllTrips = async () =>{
    const [result] = await db.query('select * from trips');
    return result;
}

export const selectTripById = async (tripId) => {
    const [result] = await db.query ('select t.*, m.name as modality_name from trips t join modality m on t.modality_trip_id = m.id where t.id = ?', [tripId]);
    if (result.length === 0)return null;   
    return result [0];
}

export const insertTrip = async({creator_id, title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id})=>{
    const [result] = await db.query ('insert into trips (creator_id, title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id)values (?,?,?,?,?,?,?,?,?,?,?,?,?)',[creator_id, title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id]);
    return result;
}

export const deleteById = async (tripId) =>{
    const [result] = await db.query ('delete from trips where id=?', [tripId]);
    return result;
}

export const update = async (tripId, {title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id}) => {
    const [result] = await db.query('update trips set title = ?, description = ?, start_date= ?, end_date = ?, cost_per_person = ?, min_participants = ?, max_participants = ?, location = ?, transport= ?, itinerary = ?, status =?, modality_trip_id =? where id = ?', [title, description, start_date, end_date, cost_per_person, min_participants, max_participants, location, transport, itinerary, status, modality_trip_id, tripId]);
    return result;
}
