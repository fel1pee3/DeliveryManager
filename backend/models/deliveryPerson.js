const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DeliveryPerson = sequelize.define('DeliveryPerson', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'delivery_persons',
  timestamps: true
});

module.exports = DeliveryPerson;