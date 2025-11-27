Base URL: `http://localhost:3000/api`
########################################## USER ######################################################################################
- GET /api/users - Listar todos los usuarios
- GET /api/users/:userId - Obtener usuario por id

########################################## TRIP ######################################################################################
- GET /api/trips - Listar todos viajes
- GET /api/trips/:tripId - Obtener viaje por id
- GET /api/trips/user/:userId - Listar viajes creados por un usuario (creator)
- GET /api/trips/modality/:modalityId - Listar viajes por modalidad
- GET /api/trips/filter - Listar viajes filtrados

{
  "title": "AlcaláPH",
  "start_date": "2026-03-26",
  "end_date": "2026-03-26",
  "status": "published",
  "modality_trip_id": 2,
  "id_creator": 1
}

- POST /api/trips - Crear un viaje

{
    "creator_id": 1,
    "title": "AlcaláPH",
    "description": "Visita a la Magistral",
    "start_date": "2026-03-26",
    "end_date": "2026-03-26",
    "cost_per_person": "50.00",
    "min_participants": 2,
    "max_participants": 8,
    "location": "Alcalá de Henares",
    "transport": "A pie",
    "itinerary": "Calles y monumentos",
    "status": "published",
    "modality_trip_id": 2
}

- PUT /api/trips/:tripId - Actualizar un viaje

- DELETE /api/trips/:tripId - Eliminar un viaje


########################################## MODALITY ######################################################################################

- GET /api/modality - Listar todas las modalidades
- GET /api/modality/:modalityId - Obtener una modalidad por id
