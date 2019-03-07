const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { GeneralServiceError } = require('../lib/error');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    done(new GeneralServiceError(), null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, user, done) => {
      try {
        const existingUser = await User.findOne({ googleId: user.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await new User({ googleId: user.id }).save();
        done(null, newUser);
      } catch (err) {
        done(new GeneralServiceError(), null);
      }
    }
  )
);
