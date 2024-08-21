require('../models')

const request = require('supertest')
const app = require('../app')


const movie = {
    movieName: "DeadPool",
    releaseDate: "2024-7-24"
}

let movieId
console.log(movieId);


const BASE_URL ='/api/v1/movies'

test("POST -> BASE_URL should return status code 201 and res.body.movieName = movie.movieName", async () => {
    
    const res = await request(app)
    .post(BASE_URL)
    .send(movie)
    
    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.movieName).toBe(movie.movieName)

})

test("GET -> BASE_URL should return status code 200 and res.body.length = 1", async () => {
    
    const res = await request(app)
    .get(BASE_URL)
    
   
    
     expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)
})

test("GET -> BASE_URL/id should return status code 200 and res.body.name === ", async () => {
    
    const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.movieName).toBe(movie.movieName)

    expect(res.body.genres).toBeDefined()
    expect(res.body.genres).toHaveLength(0)
})

test('PUT -> BASE_URL/:id, should return status code 200, res.body.moviename  ==== movieUpdate.movieName', async () => { 

    const movieUpdate = {

         movieName: "TITANIC",
    releaseDate: "1995-9-20"

    } 

    const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.movieName).toBe(movieUpdate.movieName)

 })


 test('DELETE -> BASE_URL/:id should return status code 204 ', async () => { 

    const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)

  })