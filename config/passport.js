const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Load User Model 
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email' }, (email, passport, done) => {
        // Match User
        User.findOne({ email: email })        
                .then(user => {
                    if (!user){
                        return done(null, false, {message: 'Email is not registered'});
                    }

                    //bcrypt.js password
                    bcrypt.compare(passport, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if(isMatch) {
                            return done(null, user);
                        } else {
                            return done (null, false, {message: 'Password incorrect'})
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );
//Copy http://www.passportjs.org/docs/ 
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

}