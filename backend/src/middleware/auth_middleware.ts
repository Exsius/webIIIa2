import { Request, Response, NextFunction } from "express"

/**
 * Middleware to check if user is authenticated
 * @param {IAuthRequest} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {void}
 */
export const checkAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).send('user is not authenticated')
}

/**
 * Middleware to check if user is not authenticated
 * @param {IAuthRequest} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @returns {void}
 */
export const checkNotAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.sendStatus(401).send('user is already authenticated')
    }
    return next()
}

/**
 * Interface for authenticated requests
 * @interface
 * @extends Request
 */
export interface IAuthRequest extends Request {
    isAuthenticated(): boolean
}