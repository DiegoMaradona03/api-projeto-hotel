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

routes.post('/api/login', loginController.login);
routes.get('/api/login', loginController.validaToken);

routes.get('/api/usuarios', MiddlewareAuth.validate, Usuario.read);
routes.get('/api/usuarios/:id', MiddlewareAuth.validate, Usuario.readOne);
routes.post('/api/usuarios', Usuario.create);
routes.patch('/api/usuarios', Usuario.reset);
routes.patch('/api/usuarios/:id', MiddlewareAuth.validate, Usuario.update);
routes.delete('/api/usuarios/:id', MiddlewareAuth.validate, Usuario.remove);

routes.get('/api/telefones', MiddlewareAuth.validate, Telefone.read);
routes.get('/api/telefones/:id', MiddlewareAuth.validate, Telefone.readOne);
routes.post('/api/telefones', Telefone.create);
routes.patch('/api/telefones/:id', MiddlewareAuth.validate, Telefone.update);
routes.delete('/api/telefones/:id', MiddlewareAuth.validate, Telefone.remove);

routes.get('/api/quartos', MiddlewareAuth.validate, Quarto.read);
routes.get('/api/quartos/:id', MiddlewareAuth.validate, Quarto.readOne);
routes.post('/api/quartos', MiddlewareAuth.validate, Quarto.create);
routes.patch('/api/quartos/:id', MiddlewareAuth.validate, Quarto.update);
routes.delete('/api/quartos/:id', MiddlewareAuth.validate, Quarto.remove);

routes.get('/api/reservas', MiddlewareAuth.validate, Reserva.read);
routes.get('/api/reservas/:id', MiddlewareAuth.validate, Reserva.readOne);
routes.post('/api/reservas', MiddlewareAuth.validate, Reserva.create);
routes.patch('/api/reservas/:id', MiddlewareAuth.validate, Reserva.update);
routes.delete('/api/reservas/:id', MiddlewareAuth.validate, Reserva.remove);

module.exports = routes;