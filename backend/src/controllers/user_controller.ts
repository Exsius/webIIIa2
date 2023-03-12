import { Request, Response } from "express"

export const login = (req: Request, res: Response) => {
    res.status(200).send({ user_id: req.user })
}

export const logout = async (req: Request, res: Response) => {
    req.logOut(() => {
        res.redirect('/')
    })
}
