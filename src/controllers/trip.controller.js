import { 
  selectAllTrips,
  selectTripById,
  insertTrip,
  deleteById,
  update,
  selectTripsByUserId,
  selectTripsByModality,
  selectFilterTrips
} from "../models/trip.model.js";

import { enviarAvisoCambioViaje } from "../services/emailService.js";

// Helper para formato de fechas en el email
const formatDateForEmail = (date) =>
  date
    ? new Date(date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "No definida";

// Traducción de estados técnicos -> texto para el usuario
const statusLabel = {
  draft: "borrador",
  published: "activo",
  closed: "cancelado",
};

// ========================
// GET: Todos los viajes
// ========================
export const getAllTrips = async (req, res) => {
  try {
    const trips = await selectAllTrips();
    return res.json(trips);
  } catch (error) {
    console.error("Error en getAllTrips:", error);
    return res.status(500).json({ message: "Error al obtener los viajes" });
  }
};

// ========================
// GET: Viaje por ID (usa req.trip del middleware)
// ========================
export const getTripById = async (req, res) => {
  // checkId ya habrá cargado req.trip o devuelto 404
  return res.json(req.trip);
};

// ========================
// GET: Viajes por usuario creador
// ========================
export const getTripsByUserCreator = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await selectTripsByUserId(userId);

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found for this user" });
    }

    return res.json(trips);
  } catch (error) {
    console.error("Error en getTripsByUserCreator:", error);
    return res.status(500).json({ message: "Error al obtener los viajes del usuario" });
  }
};

// ========================
// GET: Viajes por modalidad
// ========================
export const getTripsByModality = async (req, res) => {
  try {
    const { modalityId } = req.params;
    const trips = await selectTripsByModality(modalityId);

    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found for this modalityId" });
    }

    return res.json(trips);
  } catch (error) {
    console.error("Error en getTripsByModality:", error);
    return res.status(500).json({ message: "Error al obtener los viajes por modalidad" });
  }
};

// ========================
// POST: Filtrar viajes
// ========================
export const getFiltredTrips = async (req, res) => {
  try {
    // Si lo necesitáis para debug, se puede dejar comentado:
    // console.log("BODY FILTER ===>", req.body);
    const result = await selectFilterTrips(req.body);
    return res.json(result);
  } catch (error) {
    console.error("Error en getFiltredTrips:", error);
    return res.status(500).json({ message: "Error al filtrar los viajes" });
  }
};

// ========================
// POST: Crear viaje
// ========================
export const createTrip = async (req, res) => {
  try {
    const { insertId } = await insertTrip(req.body);
    const trip = await selectTripById(insertId);
    return res.status(201).json(trip);
  } catch (error) {
    console.error("Error en createTrip:", error);
    return res.status(500).json({ message: "Error al crear el viaje" });
  }
};

// ========================
// DELETE: Eliminar viaje
// ========================
export const removeTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await selectTripById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    await deleteById(tripId);

    return res.json({ message: "Deleted trip", trip });
  } catch (error) {
    console.error("Error en removeTrip:", error);
    return res.status(500).json({ message: "Error al eliminar el viaje" });
  }
};

// ========================
// PUT: Actualizar viaje + enviar email si cambian fechas
// ========================
export const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    // 1. Trip ANTES de actualizar
    const tripBefore = await selectTripById(tripId);

    if (!tripBefore) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // 2. Datos actualizados (lo nuevo del body pisa lo anterior)
    const datosActualizados = {
      ...tripBefore,
      ...req.body,
    };

    // 3. UPDATE en BD
    await update(tripId, datosActualizados);

    // 4. Trip DESPUÉS de actualizar
    const tripAfter = await selectTripById(tripId);

    // ==== A) Detectar CAMBIO DE FECHAS ====

    const sameDate = (a, b) => {
      if (!a && !b) return true;
      if (!a || !b) return false;
      return new Date(a).getTime() === new Date(b).getTime();
    };

    const oldStartDate = tripBefore.start_date;
    const oldEndDate   = tripBefore.end_date;
    const newStartDate = tripAfter.start_date;
    const newEndDate   = tripAfter.end_date;

    const fechasCambiaron =
      !sameDate(oldStartDate, newStartDate) ||
      !sameDate(oldEndDate, newEndDate);

    // ==== B) Detectar CANCELACIÓN DEL VIAJE ====

    const oldStatus = tripBefore.status;
    const newStatus = tripAfter.status;

    // VIAJE CANCELADO = pasa de otro estado a "closed"
    const viajeCancelado =
      oldStatus !== newStatus && newStatus === "closed";

    // ==== C) Enviar SOLO UN email ====

    if (viajeCancelado) {
      // 1ª prioridad: viaje cancelado
      const destinatario =
        process.env.EMAIL_USER || "tripbudnotifications@gmail.com";

      const nombreViaje =
        tripAfter.title || `Trip ${tripAfter.id || tripId}`;

      const asunto = "Tu viaje ha sido cancelado";

      const mensaje = `Hola,

Tu viaje "${nombreViaje}" ha sido cancelado.

Estado del viaje:

Estado anterior: ${statusLabel[oldStatus] ?? oldStatus}
Nuevo estado: ${statusLabel[newStatus] ?? newStatus}

Revisa TripBud para más detalles.

Equipo TripBud.
`;

      await enviarAvisoCambioViaje(destinatario, asunto, mensaje);
      console.log("Email de CANCELACIÓN enviado");
    } else if (fechasCambiaron) {
      // 2ª prioridad: solo cambio de fechas
      const destinatario =
        process.env.EMAIL_USER || "tripbudnotifications@gmail.com";

      const nombreViaje =
        tripAfter.title || `Trip ${tripAfter.id || tripId}`;

      const asunto = "Se han actualizado las fechas de tu viaje";

      const mensaje = `Hola,

Las fechas de tu viaje "${nombreViaje}" han sido actualizadas.

Fecha de inicio anterior: ${formatDateForEmail(oldStartDate)}
Nueva fecha de inicio: ${formatDateForEmail(newStartDate)}

Fecha de fin anterior: ${formatDateForEmail(oldEndDate)}
Nueva fecha de fin: ${formatDateForEmail(newEndDate)}

Revisa TripBud para más detalles.

Equipo TripBud.
`;

      await enviarAvisoCambioViaje(destinatario, asunto, mensaje);
      console.log("Email de CAMBIO DE FECHAS enviado");
    } else {
      console.log(
        "Sin cambios relevantes (ni fechas ni cancelación). No se envía email."
      );
    }

    // ==== D) Mensaje de respuesta al front ====
    let responseMessage = "Trip actualizado correctamente";

    if (viajeCancelado) {
      responseMessage = "Trip cancelado correctamente";
    } else if (fechasCambiaron) {
      responseMessage = "Fechas del viaje actualizadas correctamente";
    }

    return res.json({
      message: responseMessage,
      trip: tripAfter,
    });
  } catch (error) {
    console.error("Error en updateTrip:", error);
    return res.status(500).json({ message: "Error al actualizar el viaje" });
  }
};