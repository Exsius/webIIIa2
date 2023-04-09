import { Request, Response } from "express"

/**
Handle user login request.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {void}
*/
export const login = (req: Request, res: Response) => {
    res.status(200).send({ user_id: req.user })
}

/**
Handle user logout request.
@param {Request} req - The request object.
@param {Response} res - The response object.
@returns {Promise<void>}
*/
export const logout = async (req: Request, res: Response) => {
    req.logOut(() => {
        res.redirect('/')
    })
}
