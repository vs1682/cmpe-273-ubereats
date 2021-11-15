import jwt from 'jsonwebtoken';
import 'dotenv/config';
import passport from 'passport';
import pJWT from 'passport-jwt';

const JWTstrategy = pJWT.Strategy;
const ExtractJWT = pJWT.ExtractJwt;

passport.use(new JWTstrategy(
  {
    secretOrKey: process.env.TOKEN_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  },
  async (token, done) => {
    console.log('----ATLEAST HERE----',process.env.TOKEN_SECRET);
    try {
      console.log('----TOKEN----', token);
      return done(null, token.user);
    } catch (error) {
      console.log('----TOKEN ERROR----', error);
      done(error);
    }
  }
));

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null)
//     return res.sendStatus(401);

//   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//     if (err)
//       return res.sendStatus(403);

//     req.user = user

//     next();
//   });
// }

// export default authenticateToken;