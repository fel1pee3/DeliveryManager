const mongoose = require('mongoose');

const trackingDataSchema = new mongoose.Schema({
  deliveryPersonId: {
    type: Number,
    required: true,
    index: true
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
    start: {
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
    checkpoints: [{
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      },
      order: Number,
      reached: Boolean
    }],
    end: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

trackingDataSchema.index({ position: '2dsphere' });

module.exports = mongoose.model('TrackingData', trackingDataSchema);