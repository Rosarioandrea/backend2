import { Router } from 'express';
import passport from 'passport';

const router = Router();


router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, err => {
      if (err) return next(err);
      
      const { password, ...userData } = user.toObject();
      return res.json({ message: 'Login exitoso', user: userData });
    });
  })(req, res, next);
});


router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logout exitoso' });
  });
});

export default router;