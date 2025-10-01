const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuario');
const Telefone = require('./controllers/telefone');
const Quarto = require('./controllers/quartos');
const Reserva = require('./controllers/reservas');
const loginController = require('./controllers/login');
const MiddlewareAuth = require('./middlewares/auth');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Hotel' });
});

routes.post('/login', loginController.login);
routes.get('/login', loginController.validaToken);

routes.get('/usuarios', MiddlewareAuth.validate, Usuario.read);
routes.get('/usuarios/:id', MiddlewareAuth.validate, Usuario.readOne);
routes.post('/usuarios', Usuario.create);
routes.patch('/usuarios', Usuario.reset);
routes.patch('/usuarios/:id', MiddlewareAuth.validate, Usuario.update);
routes.delete('/usuarios/:id', MiddlewareAuth.validate, Usuario.remove);

routes.get('/telefones', Telefone.read);
routes.get('/telefones/:id', Telefone.readOne);
routes.post('/telefones', Telefone.create);
routes.patch('/telefones/:id', Telefone.update);
routes.delete('/telefones/:id', Telefone.remove);

routes.get('/quartos', Quarto.read);
routes.get('/quartos/:id', Quarto.readOne);
routes.post('/quartos', Quarto.create);
routes.patch('/quartos/:id', Quarto.update);
routes.delete('/quartos/:id', Quarto.remove);

routes.get('/reservas', Reserva.read);
routes.get('/reservas/:id', Reserva.readOne);
routes.post('/reservas', Reserva.create);
routes.patch('/reservas/:id', Reserva.update);
routes.delete('/reservas/:id', Reserva.remove);

module.exports = routes;