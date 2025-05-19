import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import './src/config/passport.js';

import cartRoutes from './src/routes/cart.routes.js';
import productRoutes from './src/routes/product.routes.js';
import userRoutes from './src/routes/user.routes.js';
import sessionRoutes from './src/routes/session.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto-seguro',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, // duración de la sesión en segundos (14 días)
  }),
  cookie: {
    maxAge: 3600000, // 1 hora
    httpOnly: true,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error de conexión', err));