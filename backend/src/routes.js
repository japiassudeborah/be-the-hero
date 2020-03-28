const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentsController = require('./controllers/IncidentsController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);


module.exports = routes;