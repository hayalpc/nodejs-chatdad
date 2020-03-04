const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users');

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret:process.env.GOOGLE_LOGIN_SECRET_KEY,
    callbackURL:process.env.GOOGLE_LOGIN_CALLBACK_URL
},(accessToken,refreshToken,profile,done)=>{
    const data = profile._json;
    User.findOrCreate({
        'googleId': data.id
    },{
        name:data.name.givenName,
        surname:data.name.familyName,
        profilePhotoUrl:data.image.url + '0'
    },(err,user)=>{
        return done(err,user);
    });


    // User.findOne({
    //     'googleId': profile.id
    // }, function(err, user) {
    //     if (err) {
    //         return done(err);
    //     }
    //     if (!user) {
    //         user = new User({
    //             name:data.name.givenName,
    //             surname:data.name.familyName,
    //             profilePhotoUrl:data.image.url
    //         });
    //         user.save(function(err) {
    //             if (err) console.log(err);
    //             return done(err, user);
    //         });
    //     } else {
    //         //found user. Return
    //         return done(err, user);
    //     }
    // });

}));
passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
module.exports = passport;