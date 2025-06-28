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
import loggerRouter from './src/routes/logger.routes.js'; 
import addLogger from './src/middlewares/logger.middleware.js'; 
import logger from './src/utils/logger.js';

// Importá el router mocks
import mocksRouter from './src/routes/mocks.router.js';

dotenv.config();
const app = express();

// Middleware de logger
app.use(addLogger);

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
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/auth', authRoutes);
app.use('/', loggerRouter); // ruta de prueba del logger

// Montar el router mocks bajo /api/mocks
app.use('/api/mocks', mocksRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('✅ Conectado a MongoDB');
    app.listen(process.env.PORT, () => {
      logger.info(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => logger.fatal(`❌ Error de conexión: ${err.message}`));