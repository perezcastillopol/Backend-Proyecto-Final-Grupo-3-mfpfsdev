import {selectTripById} from '../models/trip.model.js';

export const checkId = async (req, res, next) => {
    const {tripId} = req.params;
    if (isNaN(tripId)){
        return res.status(400).json ({message: 'ID must be a number'})
    }
    const result = await selectTripById(tripId);
    if (!result){
        return res.status (404).json({message: "Trip not found"});
    }
    req.trip = result;
    next ();
}