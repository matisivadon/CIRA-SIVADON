import passport from "passport"
import { Strategy as GithubStrategy } from "passport-github2"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import UserManager from '../dao/mongoManagers/users-manager.js'
import { usersModel } from "../dao/models/users.model.js"


const userManager = new UserManager()


//passport-github

passport.use('github', new GithubStrategy({
    clientID: 'Iv1.5867ca85f57ae839',
    clientSecret: 'e0c1268f19d23b3b486a66ec4d3722a932523950',
    callbackURL: 'http://localhost:8080/users/github',
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    const user = await userManager.findOneUser({ email: profile._json.email })
    if (!user) {
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' '
        }
        const result = await userManager.createUser(newUser)
        done(null, result)
    } else {
        done(null, user)
    }
}))



// passport-google

passport.use('google', new GoogleStrategy({
    clientID: '1087196023782-nthtklg0c8vndqorgdo9i4vm9bhfb908.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8080/users/google',
}, async(accessToken, refreshToken, profile, done) => {
    const user = await userManager.findOneUser({ email: profile._json.email })
    if (!user) {
        const newUser = {
            first_name: profile._json.given_name,
            last_name: profile._json.family_name || ' ',
            email: profile._json.email,
            password: ' '
        }
        const result = await userManager.createUser(newUser)
        done(null, result)
    } else {
        done(null, user)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
    const user = await usersModel.findById(_id)
    done(null, user)
})