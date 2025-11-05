const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        id, 
        empresa, 
        login, 
        nome, 
        email, 
        celular, 
        status, 
        nivel, 
        hierarquia, 
        ultimo_log, 
        criacao
      FROM usuarios 
      ORDER BY criacao DESC
    `);

    res.json({
      success: true,
      users: result.recordset
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query(`
        SELECT 
          id, 
          empresa, 
          login, 
          nome, 
          email, 
          celular, 
          status, 
          nivel, 
          hierarquia, 
          ultimo_log, 
          criacao
        FROM usuarios 
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      success: true,
      user: result.recordset[0]
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

module.exports = router;
