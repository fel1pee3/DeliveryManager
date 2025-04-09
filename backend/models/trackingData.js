const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  deliveryPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPerson',
    required: true
  },
  position: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  route: {
    start: { type: mongoose.Schema.Types.Mixed },
    checkpoints: [mongoose.Schema.Types.Mixed],
    end: { type: mongoose.Schema.Types.Mixed }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

trackingSchema.index({ position: '2dsphere' });
module.exports = mongoose.model('TrackingData', trackingSchema);