const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

// Configuração do PostgreSQL
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: false
  }
);

if (!process.env.MONGO_URI) {
    throw new Error('❌ Variável MONGO_URI não definida no .env');
  }
  
  // Modifique a conexão para:
  const connectMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ MongoDB conectado em:', process.env.MONGO_URI);
    } catch (error) {
      console.error('❌ Falha na conexão com MongoDB:', error.message);
      process.exit(1); // Encerra o processo com erro
    }
  };

module.exports = { sequelize, connectMongoDB };