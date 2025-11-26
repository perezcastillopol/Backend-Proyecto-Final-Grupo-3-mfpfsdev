import { selectAllTrips, selectTripById, insertTrip, deleteById, update} from '../models/trip.model.js';

export const getAllTrips = async (req, res) => {
  const trips = await selectAllTrips();
  res.json(trips);
};

export const getTripById = async (req, res) =>{
  res.json(req.trip)
}

export const createTrip = async(req, res) =>{
  const {insertId} = await insertTrip (req.body);
  const result = await selectTripById (insertId);
  res.json(result)

}

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