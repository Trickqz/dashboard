require('dotenv').config();
const express = require('express');
const cors = require('cors');

const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const verificationRoute = require('./routes/verification');
const profileRoute = require('./routes/profile');
const networkRoute = require('./routes/network');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/verify', verificationRoute);
app.use('/profile', profileRoute);
app.use('/network', networkRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});