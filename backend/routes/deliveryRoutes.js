const express = require('express');
const router = express.Router();
const controller = require('../controllers/deliveryController');

// Rotas CRUD
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Rotas específicas
router.post('/:id/location', controller.updateLocation);
router.post('/:id/route', controller.assignRoute);

module.exports = router;