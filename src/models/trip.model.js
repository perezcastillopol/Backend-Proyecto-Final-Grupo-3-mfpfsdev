import db from "../../config/db.js";

/***********************************************************GET****************************************/

export const selectAllTrips = async () => {
  const [result] = await db.query("SELECT * FROM trips");
  return result;
};

export const selectTripById = async (tripId) => {
  const [result] = await db.query(
    `SELECT t.*, m.name AS modality_name
     FROM trips t
     JOIN modality m ON t.modality_trip_id = m.id
     WHERE t.id = ?`,
    [tripId]
  );
  if (result.length === 0) return null;
  return result[0];
};

export const selectTripsByUserId = async (userId) => {
  const [result] = await db.query(
    `SELECT t.*, m.name AS modality_name
     FROM trips t
     JOIN modality m ON t.modality_trip_id = m.id
     WHERE t.creator_id = ?`,
    [userId]
  );
  return result;
};

export const selectTripsByModality = async (modalityId) => {
  const [result] = await db.query(
    "SELECT * FROM trips WHERE modality_trip_id = ?",
    [modalityId]
  );
  return result;
};

export const selectFilterTrips = async ({
  creator_id,
  title,
  modality_trip_id,
  start_date,
  end_date,
  status,
}) => {
  let sql = "SELECT * FROM trips WHERE 1=1";
  const params = [];

  if (creator_id) {
    sql += " AND creator_id = ?";
    params.push(creator_id);
  }

  if (title) {
    sql += " AND (title LIKE ? OR description LIKE ?)";
    params.push(`%${title}%`, `%${title}%`);
  }

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (modality_trip_id) {
    sql += " AND modality_trip_id = ?";
    params.push(modality_trip_id);
  }

  if (start_date && end_date) {
    sql += " AND start_date >= ? AND end_date <= ?";
    params.push(start_date, end_date);
  } else {
    if (start_date) {
      sql += " AND start_date >= ?";
      params.push(start_date);
    }
    if (end_date) {
      sql += " AND end_date <= ?";
      params.push(end_date);
    }
  }

  // console.log("FILTER SQL:", sql, params);

  const [result] = await db.query(sql, params);
  return result;
};

/***********************************************************INSERT*************************************/

export const insertTrip = async ({
  creator_id,
  title,
  description,
  start_date,
  end_date,
  cost_per_person,
  min_participants,
  max_participants,
  location,
  transport,
  itinerary,
  status,
  modality_trip_id,
  photo_url,
  num_participants,
}) => {
  const [result] = await db.query(
    `INSERT INTO trips (
      creator_id,
      title,
      description,
      start_date,
      end_date,
      cost_per_person,
      min_participants,
      max_participants,
      location,
      transport,
      itinerary,
      status,
      modality_trip_id,
      photo_url,
      num_participants
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      creator_id,
      title,
      description,
      start_date,
      end_date,
      cost_per_person,
      min_participants,
      max_participants,
      location,
      transport,
      itinerary,
      status,
      modality_trip_id,
      photo_url,
      num_participants,
    ]
  );
  return result;
};

/***********************************************************DELETE****************************************/

export const deleteById = async (tripId) => {
  const [result] = await db.query("DELETE FROM trips WHERE id = ?", [tripId]);
  return result;
};

/***********************************************************UPDATE****************************************/

export const update = async (
  tripId,
  {
    title,
    description,
    start_date,
    end_date,
    cost_per_person,
    min_participants,
    max_participants,
    location,
    transport,
    itinerary,
    status,
    modality_trip_id,
    photo_url,
    num_participants,
  }
) => {
  const [result] = await db.query(
    `UPDATE trips
     SET title = ?, 
         description = ?, 
         start_date = ?, 
         end_date = ?,
         cost_per_person = ?, 
         min_participants = ?, 
         max_participants = ?,
         location = ?, 
         transport = ?, 
         itinerary = ?, 
         status = ?,
         modality_trip_id = ?,  
         photo_url = ?, 
         num_participants = ?
     WHERE id = ?`,
    [
      title,
      description,
      start_date,
      end_date,
      cost_per_person,
      min_participants,
      max_participants,
      location,
      transport,
      itinerary,
      status,
      modality_trip_id,
      photo_url,
      num_participants,
      tripId,
    ]
  );

  return result;
};
