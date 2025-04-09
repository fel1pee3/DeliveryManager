const DeliveryPerson = require('../models/deliveryPerson');
const TrackingData = require('../models/trackingData');
const { getIO } = require('../services/realtimeService');

module.exports = {
  // CRUD Básico
  async create(req, res) {
    try {
      const person = await DeliveryPerson.create(req.body);
      res.status(201).json(person);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const persons = await DeliveryPerson.findAll();
      res.json(persons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const person = await DeliveryPerson.findByPk(req.params.id);
      if (!person) return res.status(404).json({ error: 'Entregador não encontrado' });
      res.json(person);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Funcionalidades Específicas
  async updateLocation(req, res) {
    try {
      const { lat, lng } = req.body;
      const tracking = await TrackingData.findOneAndUpdate(
        { deliveryPersonId: req.params.id },
        {
          position: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          lastUpdated: new Date()
        },
        { upsert: true, new: true }
      );

      getIO().emit('locationUpdate', {
        deliveryPersonId: req.params.id,
        position: { lat, lng },
        route: tracking.route
      });

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async assignRoute(req, res) {
    try {
      const { start, checkpoints, end } = req.body;
      await TrackingData.findOneAndUpdate(
        { deliveryPersonId: req.params.id },
        { route: { start, checkpoints, end } },
        { upsert: true }
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};