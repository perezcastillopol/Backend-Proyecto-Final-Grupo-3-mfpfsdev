import { selectAllTrips, selectTripById, insertTrip, deleteById, update, selectTripsByUserId, selectTripsByModality, selectFilterTrips} from '../models/trip.model.js';

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