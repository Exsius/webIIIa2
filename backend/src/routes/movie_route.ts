import { Express, Router } from 'express'
import { getAllMovies, getMovies, getMovieById, getMovieByTmdbId, getMoviesByYearRange, getMoviesByRatingsRange, getMoviesByTitle, getMoviesByGenre } from '../controllers/movie_controller'

const movieRoute = (router: Router) => {
    router.get('/movies/', getAllMovies)
    router.get('/movies/limit/:num', getMovies)
    router.get('/movies/:id', getMovieById)
    router.get('/movies/tmdb/:id', getMovieByTmdbId)
    router.get('/movies/year/:min/:max', getMoviesByYearRange)
    router.get('/movies/ratings/:min/:max', getMoviesByRatingsRange)
    router.get('/movies/title/:text', getMoviesByTitle)
    router.get('/movies/genre/:name', getMoviesByGenre)
}

export default movieRoute