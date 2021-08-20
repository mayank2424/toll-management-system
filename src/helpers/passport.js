// @ts-nocheck

const { AUTH_TYPES, } = require('@config/auth.config');
const { JWT_SECRET, GOOGLE_CREDS } = require('@config/appConfig');

//Strategy Types
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy } = require('passport-jwt');

//Models
const { isPasswordMatch } = require('@helper/auth/index');
const UserService = require('@services/user');


//Verify Jwt Token Callback handler
const jwtVerify = async(req, payload, callback) => {
    try {
        const { _id } = payload || {};
        const user = await UserService.getUserById(_id)
        if(!user) return callback(null, false);
        return callback(null, user);
        //Fetch user Details
    } catch(err) {
        callback(err, false)
    }
};

//Login Strategy Callback handler
const localLogin = async(req, email, password,  callback) => {
    try {
        const user = await UserService.getUserByEmail(email, ['email password roles']);
        
        if(!user) return callback(null, false, {
            message: userResponseConfig.notFound
        })
        const { password: currentPassword } = user;

        //Check for password match
        if(!isPasswordMatch(password, currentPassword)) return callback(null, false, {
            message: "Incorrect Password"
        })
        //Sanitize user Object
        return callback(null, user);
    } catch(err) {
        callback(err, false);
    }
};

//Strategies
const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, localLogin);

const JwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:JWT_SECRET,
    passReqToCallback: true
}, jwtVerify);

module.exports = {
    localStrategy,
    JwtStrategy,
}