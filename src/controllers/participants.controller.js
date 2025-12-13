import {selectAcceptedParticipantsByTrip, isParticipantOfTrip} from '../models/participant.model.js';



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

export const isParticipant = async (req, res) => {
  try {
    const {tripId} = req.params;
    const {userId} = req.params;
    const result = await isParticipantOfTrip(tripId, userId);
    
    // Convertir el resultado a boolean
    const isParticipantBoolean = result && result.length > 0 
      ? Boolean(result[0].is_participant) 
      : false;
    
    res.json({ is_participant: isParticipantBoolean });
  } catch (error) {
    console.error('Error fetching trip participants:', error);
    res.status(500).json({message: 'Error al obtener participantes del viaje'});
  }
}



