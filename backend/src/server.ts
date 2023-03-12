import 'dotenv/config'

import express from 'express'
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import './configs/passport'

import indexrouter from './routes'

const app = express()
app.use(express.urlencoded())
app.use(flash())
app.use(session({
    secret: process.env.SECRET ? process.env.SECRET : '',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.authenticate('session'))
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use('/api', indexrouter)

app.get(['/:wildcard', '/:wildcard/*'], (req, res) => {
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    })
})

app.listen(3000)