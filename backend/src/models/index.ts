import mongoose, { HydratedDocument } from 'mongoose'
import movieModel, { IMovie } from './movie_model'
import userModel, { IUser } from './user_model'

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
}

const connectWithRetry = () => {
  mongoose.connect(uri, options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log(err)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

export const Movie = movieModel
export const User  = userModel