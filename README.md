
# Assignment 2 💬

A webIII school project API written in node, mongodb and typescript

## API Reference 🤌

### [Get all movies](https://a2.simphub.online/api/movies)
```bash
  GET /api/movies
```
Returns the entire set of movies available in the database

### [Get movies with limit](https://a2.simphub.online/api/movies/limit/movies/5)
```bash
  GET /api/movies/limit/:limit
```
Returns the first set of movies, with the quantity specified by the limit
| Parameter | Description                |
| :-------- | :------------------------- |
| `limit` | **Required**. The value of the num field should fall within the range of 1 to 200. |

### [Get movie by id](https://a2.simphub.online/api/movies/13)
```bash
  GET /api/movies/:id
```
Returns a movie that matches the specified id
| Parameter | Description                |
| :-------- | :------------------------- |
| `id` | **Required**. The id of the movie. |

### [Get movie by tmdb id](https://a2.simphub.online/api/movies/tmdb/186)
```bash
  GET /api/movies/tmdb/:id
```
Returns a movie that matches the specified tmdb id
| Parameter | Description                |
| :-------- | :------------------------- |
| `id` | **Required**. The tmdb id of the movie. |

### [Get movies by year range](https://a2.simphub.online/api/movies/year/1999/2001)
```bash
  GET /api/movies/year/:min/:max
```
Returns movies that were released within the specified year range
| Parameter | Description                |
| :-------- | :------------------------- |
| `min` | **Required**. the lower year range. |
| `max` | **Required**. the upper year range. |

### [Get movies by rating range](https://a2.simphub.online/api/movies/ratings/3/6)
```bash
  GET /api/movies/ratings/:min/:max
```
Returns movies that having a rating between the specified rating range
| Parameter | Description                |
| :-------- | :------------------------- |
| `min` | **Required**. the lower rating range. |
| `max` | **Required**. the upper rating range. |

### [Get movies by title](https://a2.simphub.online/api/movies/title/simp)
```bash
  GET /api/movies/title/:text
```
Returns movies with titles that contains the specified text
| Parameter | Description                |
| :-------- | :------------------------- |
| `text` | **Required**. the string used to search titles for |

### [Get movies by genre](https://a2.simphub.online/api/movies/genre/drama)
```bash
  GET /api/movies/genre/:name
```
Returns movies with genre that contains the specified name
| Parameter | Description                |
| :-------- | :------------------------- |
| `name` | **Required**. the string used to search genres for |

## Development deployment 🚧

Clone the project

```bash
  git clone https://github.com/Exsius/webIIIa2
```

Go to the project directory

```bash
  cd webIIIa2
```

Start the server

```bash
  docker-compose up
```

## Production deployment 🚧

Go to the backend Dockerfile

```bash
  cd webIIIa2/backend
```

Edit Dockerfile and comment out __CMD npm run dev__ and add __CMD npm run start__

```bash
# command to run dev mode
#CMD npm run dev

# command to run podd mode
CMD npm run start
```

Go back to root of the project directory

```bash
  cd ..
```

Start the server

```bash
  docker-compose up
```

## Environment Variables ✏️

To run this project, you will need to add the following environment variables to your .env file

- `PORT` __= port to use for node server__
- `DB_NAME` __= name to use when creating database__
- `DB_PORT` __= port to use for database__
- `DB_USER` __= user to create for database__
- `DB_PASSWORD` __= password for new db user created__
- `SECRET` __= session secret__

## Tech used 🔧

- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org)
- [Express](https://expressjs.com/)
- [MongoDB](www.mongodb.com)
- [Mongoose](mongoosejs.com)
- [Passport.js](https://www.passportjs.org/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)

## Authors 🎓

- [@Exsius](https://www.github.com/exsius)

