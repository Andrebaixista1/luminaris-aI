const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'luminaris_db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: false, // Para SQL Server local
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

let pool;

async function getConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('✅ Conectado ao SQL Server');
    }
    return pool;
  } catch (error) {
    console.error('❌ Erro ao conectar ao SQL Server:', error);
    throw error;
  }
}

module.exports = { getConnection, sql };
