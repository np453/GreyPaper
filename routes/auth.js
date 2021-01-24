const dotenv = require('dotenv');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const User = require('../model/user');

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(
    
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:6161/google/callback"
    },
    
    async (accessToken, refreshToken, profile, done) => {
    //    User.findOrCreate({ googleId: profile.id }, (err, user) => {
    //     console.log(user);   
    //     return done(err, user) });
    const email = profile.emails[0].value;
    const emailExist = await User.findOne({ email:email });

    if (emailExist) {
        return ;
    }
    else {

        //Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(profile.id + profile.displayName, salt);

        const user = new User({ 
            uname:profile.name.givenName,
            dname:profile.displayName,
            email:email,
            password:hashedPassword,
            profileImg:profile._json.picture,
            theme:"light",
            kind:[
                {
                    provider:profile.provider,
                    id:profile.id
                }
            ],
         })
         console.log(profile);
        const savedUser = await user.save();
        return done(err, savedUser)
    }  
        }
)
);




// You may notice in the url the portion
//  "s64-c" which means the image size to be 64,
//   I've tried using other values like "s100-c"
//    and they worked. Also if you remove the "s64-c" part
//     and append the "?sz=100" parameter, that will also work 
//     as of now. Though this is not very good way of getting the 
//     profile picture of a gplus user, but the advantage is it do not require any api key.