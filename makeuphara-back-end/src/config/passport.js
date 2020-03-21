import { Strategy as googleStrategy } from 'passport-google-oauth20';
import User from '../database/models/user';

require('dotenv').config();
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTH_CALLBACK,
} = process.env;

const passportGoogle = () =>
  new googleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_AUTH_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await User.findOne({
          username: profile.email || profile.emails[0].value,
        });
        // console.log(result);
        if (!result) {
          const user = new User({
            username: profile.email || profile.emails[0].value,
            name: profile.displayName,
            provider: 'google',
            authToken: accessToken,
            google: profile._json,
          });
          // console.log(user);
          try {
            await user.save();
            console.log('저장했습니다');
            return done(null, user);
          } catch (exception) {
            return done(exception);
          }
        } else {
          return done(null, result);
        }
      } catch (exception) {
        return exception;
      }
    },
  );

const ConfigPassport = passport => {
  passport.serializeUser((user, done) => {
    // console.dir(user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // console.dir(user);
    done(null, user);
  });

  passport.use('google', passportGoogle());
};

export default ConfigPassport;
