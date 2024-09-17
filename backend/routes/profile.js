const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar o usuário.' });
  }
});

module.exports = router;