import passport from 'passport'
import { Router } from 'express'
import { checkAuth } from '../middleware/auth_middleware'
import { login, logout } from '../controllers/user_controller'

const userRoute = (router: Router) => {
    router.post('/user/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }), login)
    router.post('/user/logout', checkAuth, logout)
}

export default userRoute