import express from 'express'
const router = express.Router()

import movieRoute from './movie_route'
import userRoute from './user_route'

export const movie = movieRoute(router)
export const user = userRoute(router)

export default router