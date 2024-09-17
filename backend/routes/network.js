const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        email: true,
      },
    });
    res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;