import { Schema, model } from 'mongoose'

export interface IUser extends Document {
    id: number,
    details: {
        firstname: string,
        lastname: string,
        city: string,
        country: string,
    },
    picture: {
        large: string,
        thumbnail: string,
    },
    membership: {
        date_joined: string,
        last_update: string,
        likes: number,
    },
    email: string,
    password_bcrypt: string,
    apikey: string,
    favorites: object[],
}

const userModel = model<IUser>('User',
    new Schema<IUser>({
        id: Number,
        details: {
            firstname: String,
            lastname: String,
            city: String,
            country: String,
        },
        picture: {
            large: String,
            thumbnail: String,
        },
        membership: {
            date_joined: String,
            last_update: String,
            likes: Number,
        },
        email: String,
        password_bcrypt: String,
        apikey: String,
        favorites: [Object],
    },
    {
        collection: 'user'
    })
)

export default userModel