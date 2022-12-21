const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

passport.serializeUser((user,done) => {
    return done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => {
        return done(err,user);
    });
});

passport.use(new GoogleStrategy({
    clientID:     keys.GoogleID,
    clientSecret: keys.GoogleSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({ google: profile.id }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        }else{
            const newUser = {
                firstname: profile.name.givenName,
                lastname: profile.name.familyname,
                image: profile.photos[0].value,
                fullname: profile.displayName,
                google: profile.id
            }
            new User(newUser).save((err,user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null,user);
                }
            });
        }
    });
  }
));