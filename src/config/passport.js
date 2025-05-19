import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';


passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return done(null, false, { message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Contraseña incorrecta' });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;