import { Request, Response } from 'express'
import { Movie } from '../models'

/**
Retrieves all movies from the database.
@async
@function
@param {Request} req - The HTTP request object.
@param {Response} res - The HTTP response object.
@returns {Promise<void>} - A Promise that resolves with a JSON array of movie objects or an error message.
*/
export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find()
        movies.length > 0 ? res.status(200).send(movies) : res.status(500).send('no movies not found in database')
    } catch (err) {
        res.status(500).send(err)
    }
}

/**
Retrieves a specific number of movies from the database.
@async
@function
@param {Request} req - The HTTP request object.
@param {Response} res - The HTTP response object.
@returns {Promise<void>} - A Promise that resolves with a JSON array of movie objects or an error message.
*/
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

/**
Retrieves a movie by its ID from the database.
@async
@function
@param {Request} req - The HTTP request object.
@param {Response} res - The HTTP response object.
@returns {Promise<void>} - A Promise that resolves with a JSON object of the movie or an error message.
*/
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

/**
Retrieves a movie by its TMDB ID from the database.
@async
@function
@param {Request} req - The HTTP request object.
@param {Response} res - The HTTP response object.
@returns {Promise<void>} - A Promise that resolves with a JSON object of the movie or an error message.
*/
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

/**
 * Retrieves movies released within the specified year range.
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the movies have been retrieved and the response has been sent.
 */
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

/**
Retrieves movies from the database with average ratings within a given range.
@async
@function
@param {Request} req - The HTTP request object.
@param {Response} res - The HTTP response object.
@returns {Promise<void>} - A Promise that resolves with a JSON object of the movies or an error message.
*/
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

/**
Retrieves movies from the database that match a given search text in the movie title.
@async
@function
@param {Request} req - The Express Request object.
@param {Response} res - The Express Response object.
@returns {Promise<void>} - A Promise that resolves with the search results, or rejects with an error.
*/
export const getMoviesByTitle = async (req: Request, res: Response) => {
    const { text } = req.params
    try {
        const movies = await Movie.find({ title: { $regex: new RegExp(text), $options: "i" } })
        movies.length > 0 ? res.status(200).send(movies) : res.status(404).send('movie not found')
    } catch (err) {
        res.status(500).send(err)
    }
}

/**
Retrieves movies based on a specific genre name.
@async
@function
@param {Request} req - The request object containing the genre name as a parameter.
@param {Response} res - The response object to send the result back to the client.
@returns {Promise<void>} - A Promise that resolves when the movies are retrieved and sent back to the client or when an error occurs.
*/
export const getMoviesByGenre = async (req: Request, res: Response) => {
    const { name } = req.params
    try {
        const movie = await Movie.find({ 'details.genres': { $elemMatch: { name: { $regex: new RegExp(name), $options: "i" } } } })
        movie.length > 0 ? res.status(200).send(movie) : res.status(404).send('no movies found')
    } catch (err) {
        res.status(500).send(err)
    }
}