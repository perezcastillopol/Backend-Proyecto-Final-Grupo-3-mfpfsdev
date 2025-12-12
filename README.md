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


##TRIP REQUESTS## 

POST http://localhost:3000/api/trips/:tripId/invitations - Crear invitación
GET http://localhost:3000/api/trips/:tripId/invitations - Obtener invitaciones
PUT http://localhost:3000/api/trips/:tripId/invitations/:invitationId - Responder a invitación
GET http://localhost:3000/api/trips/:tripId/invitations/history - Obtener historial



####################### Notificaciones Automáticas por Email##############################################################
# Notificaciones Automáticas por Email
El sistema envía correos automáticos a los usuarios cuando ocurre un cambio importante en un viaje.  
Esta funcionalidad está en:

- `src/controllers/trip.controller.js`
- `src/services/emailService.js`

---

## Cambio de fechas del viaje

Se envía un email cuando:
- Cambia la fecha de inicio (`start_date`)
- Cambia la fecha de fin (`end_date`)

**El correo incluye:**
- Fechas anteriores  
- Nuevas fechas  
- Nombre del viaje  

**Asunto del mensaje:**
Se han actualizado las fechas de tu viaje




##  Cancelación del viaje
Se envía un email cuando:

- `status` cambia a `closed`

**El correo incluye:**
- Estado anterior  
- Nuevo estado  
- Confirmación de cancelación  

**Asunto del mensaje:**
Tu viaje ha sido cancelado




## Archivos relacionados
- Controlador: `trip.controller.js`
- Servicio de envío: `emailService.js`
- Configuración del correo: `.env`

Ejemplo `.env`:

EMAIL_USER=tripbudnotifications@gmail.com
EMAIL_PASS=qylpzaoixymqwezj


## Cómo probar las notificaciones en Thunder Client
Puedes validar el envío automático de emails haciendo peticiones desde Thunder Client (VS Code).  
Aquí  los pasos para probar cada caso:

## Probar cambio de fechas:

### Método: PUT /api/trips/:tripId
ej: (http://localhost:3000/api/trips/2)


### Body de ejemplo:
ej:
json
{
  "start_date": "2026-08-01",
  "end_date": "2026-08-10"
}


## Resultado esperado:
El viaje se actualiza.

Llegará un email al correo configurado en .env indicando que las fechas han cambiado.


## Probar cancelación de un viaje:

### Método: PUT /api/trips/:tripId
ej: (http://localhost:3000/api/trips/2)

### Body de ejemplo:
{
  "status": "closed"
}


## Resultado esperado:
El viaje cambia su estado a closed.

Se envía un email indicando que el viaje ha sido cancelado.



## Requisitos para que funcione
Servidor corriendo con npm run dev.

Configuración correcta en .env:

EMAIL_USER=tripbudnotifications@gmail.com
EMAIL_PASS=qylpzaoixymqwezj

## Nota
El sistema detecta automáticamente cambios relevantes en los viajes (cancelación o modificación de fechas) y envía notificaciones por correo electrónico utilizando Nodemailer, simulando un flujo real de producción.

En este entorno académico, se utiliza un correo real de prueba para validar el funcionamiento del sistema de notificaciones.

---

## ¿Se puede enviar al email real del usuario?
Sí. Para enviar las notificaciones al usuario creador del viaje, solo habría que:

1. Obtener el `creator_id` del viaje.  
2. Buscar su email en la base de datos.  
3. Usar ese email como destinatario.

Ejemplo:
const destinatario = email_del_usuario;

## Conclusion 
Esta implementación permite validar de forma clara y segura la lógica de notificaciones sin depender de datos reales de usuarios, facilitando pruebas, mantenimiento y futuras mejoras.