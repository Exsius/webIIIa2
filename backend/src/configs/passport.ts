import { User } from '../models/index'
import bcrypt from 'bcryptjs'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { IUser } from '../models/user_model'

/**
Passport authentication strategy for authenticating users with a username and password.
@param {string} username - The username of the user attempting to authenticate.
@param {string} password - The password of the user attempting to authenticate.
@param {function} callback - A callback function that is called after authentication is complete.
@param {Error|null} callback.err - An optional error object that may be passed to the callback if an error occurs.
@param {IUser|boolean} callback.user - An optional user object that may be passed to the callback if authentication succeeds.
@param {{message: string}} callback.msg - An optional message object that may be passed to the callback if authentication fails.
@returns {void}
*/
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

/**
Passport serializeUser function that serializes the user object into a session cookie.
@param {Object} user - The user object to be serialized.
@param {Function} callback - The callback function to be called upon serialization completion.
@returns {void}
*/
export const serializeUser = passport.serializeUser((user, callback) => {
    callback(null, user)
})

/**
Passport deserializeUser function that deserializes the user object from a session cookie.
@param {typeof User} user - The user object to be deserialized.
@param {Function} callback - The callback function to be called upon deserialization completion.
@returns {void}
*/
export const deserializeUser = passport.deserializeUser((user: typeof User, callback) => {
    callback(null, user)
})