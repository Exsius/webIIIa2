import { User } from '../models/index'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { IUser } from '../models/user_model'

export default passport.use(new Strategy(async (username: string, password: string, callback: (err?: Error | null, user?: IUser | boolean, msg?: { message: string}) => void) => {

    const selectedUser = await User.find({ email: username }).limit(0)

    if (selectedUser.length > 0) {
        bcrypt.compare(password, selectedUser[0].password_bcrypt, (err, match) => {
            if (err) { return callback(err) }
            if (match) {
                return callback(null, selectedUser[0])
            } else {
                return callback(null, false, { message: 'incorrect password.' })
            }
        })
    } else {
        return callback(null, false, { message: 'user does not exist.' })
    }
}))

export const serializeUser = passport.serializeUser((user, callback) => {
    callback(null, user)
})

export const deserializeUser = passport.deserializeUser((user: typeof User, callback) => {
    callback(null, user)
})