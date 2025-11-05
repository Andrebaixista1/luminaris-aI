const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');
const crypto = require('crypto');

// Login
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios' });
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input('login', sql.VarChar, login)
      .query('SELECT * FROM usuarios WHERE login = @login AND status = \'Ativo\'');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Login ou senha incorretos' });
    }

    const user = result.recordset[0];

    // Hash da senha fornecida com SHA2_512
    const senhaHash = crypto.createHash('sha512').update(password).digest('hex').toUpperCase();

    // Verificar senha
    const senhaValida = senhaHash === user.senha;

    if (!senhaValida) {
      return res.status(401).json({ error: 'Login ou senha incorretos' });
    }

    // Atualizar último log
    await pool
      .request()
      .input('id', sql.Int, user.id)
      .query('UPDATE usuarios SET ultimo_log = GETDATE() WHERE id = @id');

    // Retornar dados do usuário (sem a senha)
    const { senha, ...userData } = user;
    res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
