import { Request, Response } from 'express'
import { Movie } from '../models'

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find()
        movies.length > 0 ? res.status(200).send(movies) : res.status(500).send('no movies not found in database')
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMovies = async (req: Request, res: Response) => {
    const { num } = req.params
    const parsedNum = parseInt(num)
    try {
        if (parsedNum > 0 && parsedNum <= 200) {
            const movies = await Movie.find().limit(parsedNum)
            movies.length > 0 ? res.status(200).send(movies) : res.status(404).send('movies not found')
        } else {
            res.status(400).send(`can not get ${num} amount of movies, must be between 1-200`)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params
    const parsedId = parseInt(id)
    try {
        const movie = await Movie.find({ id: parsedId }).limit(1)
        movie.length > 0 ? res.status(200).send(movie) : res.status(404).send('movie not found')
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMovieByTmdbId = async (req: Request, res: Response) => {
    const { id } = req.params
    const parsedId = parseInt(id)
    try {
        const movie = await Movie.find({ tmdb_id: parsedId }).limit(1)
        movie.length > 0 ? res.status(200).send(movie) : res.status(404).send('movie not found')
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMoviesByYearRange = async (req: Request, res: Response) => {
    const { min, max } = req.params
    const parsedMin = new Date(parseInt(min), 0)
    const parsedMax = new Date(parseInt(max), 11)
    try {
        if ((parsedMin.toISOString().charAt(0) === '+') || (parsedMax.toISOString().charAt(0) === '+')) {
            res.status(400).send(`${min}-${max} year range is too high to be parsed`)
        } else if (parsedMin > parsedMax) {
            res.status(400).send(`must be valid range, ${min}-${max} is invalid`)
        } else {
            const movies = await Movie.find({ release_date: {$gte: parsedMin.toISOString(), $lte: parsedMax.toISOString()} })
            movies.length > 0 ? res.status(200).send(movies) : res.status(404).send('no movies found in range')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMoviesByRatingsRange = async (req: Request, res: Response) => {
    const { min, max } = req.params
    const parsedMin = parseInt(min)
    const parsedMax = parseInt(max)
    try {
        if ((parsedMin < 0) || (parsedMax < 0)) {
            res.status(400).send(`must be positive range, ${parsedMin < 0 ? `=>(${parsedMin})` : parsedMin}-${parsedMax < 0 ? `=>(${parsedMax})` : parsedMax} is invalid`)
        } else if (parsedMin > parsedMax) {
            res.status(400).send(`must be valid range, ${parsedMin}-${parsedMax} is invalid`)
        } else {
            const movies = await Movie.find().where('ratings.average').gte(parsedMin).lte(parsedMax)
            movies.length > 0 ? res.status(200).send(movies) : res.status(404).send('no movies found in range')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMoviesByTitle = async (req: Request, res: Response) => {
    const { text } = req.params
    try {
        const movies = await Movie.find({ title: { $regex: new RegExp(text), $options: "i" } })
        movies.length > 0 ? res.status(200).send(movies) : res.status(404).send('movie not found')
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMoviesByGenre = async (req: Request, res: Response) => {
    const { name } = req.params
    try {
        const movie = await Movie.find({ 'details.genres': { $elemMatch: { name: { $regex: new RegExp(name), $options: "i" } } } })
        movie.length > 0 ? res.status(200).send(movie) : res.status(404).send('no movies found')
    } catch (err) {
        res.status(500).send(err)
    }
}