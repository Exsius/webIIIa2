import { Request, Response, NextFunction } from "express"

export const checkAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).send('user is not authenticated')
}

export const checkNotAuth = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.sendStatus(401).send('user is already authenticated')
    }
    return next()
}

export interface IAuthRequest extends Request {
    isAuthenticated(): boolean
}