import {selectAcceptedParticipantsByTrip} from '../models/participant.model.js';



export const getTripParticipants = async (req, res) => {
  try {
    const {tripId} = req.params;
    const participants = await selectAcceptedParticipantsByTrip(tripId);
    res.json(participants);
  } catch (error) {
    console.error('Error fetching trip participants:', error);
    res.status(500).json({message: 'Error al obtener participantes del viaje'});
  }
}



