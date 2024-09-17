const express = require('express');
const { PrismaClient } = require('@prisma/client');
const emailService = require('../services/emailService');

const prisma = new PrismaClient();
const router = express.Router();

router.post('/send-verification', async (req, res) => {
  const { email } = req.body;
  const verificationCode = emailService.generateVerificationCode();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de Verificação',
    text: `Seu código de verificação é: ${verificationCode}`,
  };

  emailService.transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao enviar o email.' });
    }

    try {
      await prisma.user.update({
        where: { email },
        data: { verification_code: verificationCode },
      });
      res.json({ message: 'Código de verificação enviado com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao salvar o código de verificação.' });
    }
  });
});

router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (user.verification_code === code) {
      return res.status(200).json({ message: 'Código verificado com sucesso!' });
    } else {
      return res.status(400).json({ error: 'Código de verificação incorreto.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao verificar o código.' });
  }
});

module.exports = router;