import { selectAllTrips, selectTripById, insertTrip, deleteById, update, selectTripsByUserId, selectTripsByModality, selectFilterTrips} from '../models/trip.model.js';
import {addParticipantToTrip} from "../models/participant.model.js";


export const getAllTrips = async (req, res) => {
  const trips = await selectAllTrips();
  res.json(trips);
};

export const getTripById = async (req, res) =>{
  res.json(req.trip)
}


export const getTripsByUserCreator = async (req, res) => {
  const {userId} = req.params;
  const trips = await selectTripsByUserId(userId);
  if (trips.length === 0) {
    return res.status(404).json({message: 'No trips found for this user'});
  }
  res.json(trips);

};

export const getTripsByModality = async (req, res) =>{
  const {modalityId} = req.params;
  const trips = await selectTripsByModality(modalityId);
  if (trips.length === 0) {
    return res.status(404).json({message: 'No trips found for this modalityId'});
  }
  res.json(trips);
}

export const getFiltredTrips = async (req, res) =>{
  const result = await selectFilterTrips(req.body);
  res.json(result);
}





export const createTrip = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      creator_id: req.userId,                 // ensure creator matches authenticated user
      num_participants: req.body.num_participants ?? 0,
    };

    const { insertId } = await insertTrip(payload);
    const result = await selectTripById(insertId);
    await addParticipantToTrip(result.id, req.userId)
    res.json(result);
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ message: 'Error creating trip' });
  }
};

export const removeTrip = async (req, res)=>{
  const {tripId} = req.params;
  const result = await selectTripById(tripId);
  await deleteById (tripId);
  res.json({message: 'Deleted trip', result});
}

export const updateTrip = async (req, res) =>{
  const {tripId} = req.params;
  await update(tripId, req.body);
  const result = await selectTripById(tripId);
  res.json(result);
}
