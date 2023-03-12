import { Schema, model } from 'mongoose'

export interface IMovie extends Document {
    id: number
    tmbd_id: number
    release_date: string
    title: string
    runtime: number
    revenue: number
    tagline: string
    poster: string
    backdrop: string
    ratings: {
        popularity: number
        average: number
        count: number
    },
    details: {
        overview: string
        genres: object[]
    },
}

const movieModel = model<IMovie>('Movie',
    new Schema<IMovie>({
        id: { type: Number, required: true },
        tmbd_id: Number,
        release_date: String,
        title: String,
        runtime: Number,
        revenue: Number,
        tagline: String,
        poster: String,
        backdrop: String,
        ratings: {
            popularity: Number,
            average: Number,
            count: Number,
        },
        details: {
            overview: String,
            genres: [Object],
        },
    },
    {
        collection: 'movie'
    })
)

export default movieModel