import * as TripRequest from '../models/trip-request.model.js';

export const createRequest = async (req, res) => {
    const { tripId } = req.params;
    const { note } = req.body;
    const userId = req.userId; // El usuario autenticado es quien hace la solicitud

    try {
        // Chequea si ya existe una solicitud pendiente o aceptada
        const existing = await TripRequest.findByUserAndTrip(
            tripId,
            userId,
            ['pending', 'accepted']
        );
        if (existing.length > 0) {
            return res.status(400).json({
                error: 'Ya tienes una solicitud pendiente o aceptada para este viaje'
            });
        }
        // Crea la solicitud
        const request = await TripRequest.create(tripId, userId, note);
        res.status(201).json(request);
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
};

export const getRequests = async (req, res) => {
    const { tripId } = req.params;
    try {
        const requests = await TripRequest.findByTripId(tripId);
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
};

export const respondToRequest = async (req, res) => {
    const { tripId, requestId } = req.params;
    const { status } = req.body;
    const responderId = req.userId; // El usuario autenticado es quien responde (debe ser el creador del viaje)

    // Validación
    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({
            error: 'Estado inválido. Debe ser "accepted" o "rejected"'
        });
    }
    try {
        const request = await TripRequest.findByIdAndTrip(requestId, tripId);
        if (!request) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }
        // Actualiza la solicitud
        const updated = await TripRequest.updateStatus(requestId, status, responderId);
        res.json(updated);
    } catch (error) {
        console.error('Error responding to request:', error);
        res.status(500).json({ error: 'Error al responder a la solicitud' });
    }
};

export const getRequestHistory = async (req, res) => {
    const { tripId } = req.params;
    try {
        const requests = await TripRequest.getHistory(tripId);
        res.json(requests);
    } catch (error) {
        console.error('Error intentando conseguir el historial:', error);
        res.status(500).json({ error: 'Error intentando conseguir el historial' });
    }
};
