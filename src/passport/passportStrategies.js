import passport from "passport"
import { Strategy as GithubStrategy } from "passport-github2"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import {findOneUser, findUserById, createUser, findUser} from '../services/users.service.js'



//passport-github

passport.use('github', new GithubStrategy({
    clientID: 'Iv1.5867ca85f57ae839',
    clientSecret: 'e0c1268f19d23b3b486a66ec4d3722a932523950',
    callbackURL: 'http://localhost:8080/github',
}, async (accessToken, refreshToken, profile, done) => {
    const user = await findOneUser({ email: profile._json.email })
    if (!user) {
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' '
        }
        const result = await createUser(newUser)
        done(null, result)
    } else {
        done(null, user)
    }
}))



// passport-google

passport.use('google', new GoogleStrategy({
    clientID: '1087196023782-nthtklg0c8vndqorgdo9i4vm9bhfb908.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8080/google',
}, async(accessToken, refreshToken, profile, done) => {
    const user = await findOneUser({ email: profile._json.email })
    if (!user) {
        const newUser = {
            first_name: profile._json.given_name,
            last_name: profile._json.family_name || ' ',
            email: profile._json.email,
            password: ' '
        }
        const result = await createUser(newUser)
        done(null, result)
    } else {
        done(null, user)
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
    const user = await findUserById(_id)
    done(null, user)
})