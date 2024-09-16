const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboardinvest'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MariaDB.');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Your Email',
    pass: 'Your Password',
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/send-verification', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();

  const mailOptions = {
    from: 'Your Email',
    to: email,
    subject: 'Código de Verificação',
    text: `Seu código de verificação é: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o email:', error);
      return res.status(500).json({ error: 'Erro ao enviar o email.' });
    }
    
    db.query('UPDATE users SET verification_code = ? WHERE email = ?', [verificationCode, email], (err, results) => {
      if (err) {
        console.error('Erro ao salvar o código de verificação:', err);
        return res.status(500).json({ error: 'Erro ao salvar o código de verificação.' });
      }
      
      res.json({ message: 'Código de verificação enviado com sucesso!' });
    });
  });
});

app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  db.query('SELECT verification_code FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao verificar o código.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const user = results[0];

    if (user.verification_code === code) {
      return res.status(200).json({ message: 'Código verificado com sucesso!' });
    } else {
      return res.status(400).json({ error: 'Código de verificação incorreto.' });
    }
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password são obrigatórios.' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  });
});

app.post('/signup', async (req, res) => {
  const { username, password, name, sex, phone, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password são obrigatórios.' });
  }

  try {
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ error: 'Username já existe.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO users (username, password, name, sex, phone, email) VALUES (?, ?, ?, ?, ?, ?)', 
        [username, hashedPassword, name, sex, phone, email], 
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({ message: 'Usuário criado com sucesso!' });
        });
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro inesperado.' });
  }
});

app.get('/network', (req, res) => {
  db.query('SELECT user_id, name, username, phone, email, invest FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/profile/:username', (req, res) => {
  const { username } = req.params;
  
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(results[0]);
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});