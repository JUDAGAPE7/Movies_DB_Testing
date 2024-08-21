require('../models')

const request = require('supertest')
const app = require('../app')

const director = {
    firstName: "Roberto",
    lastName: "Gomez",
    dateOfBirth: "1946-12-18",
    country: "MExico",
}

let directorId

const BASE_URL = '/api/v1/directors'

test("Post 'BASE_URL should return status code 201 and res.body.firstName = director.firstNmae", async () => {

    const res = await request(app)
      .post(BASE_URL)
      .send(director)
  
    directorId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  })

  test("Get BASE_URL' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

            expect(res.body[0].movies).toBeDefined()
            expect(res.body[0].movies).toHaveLength(0)

            expect(res.body[0].genres).toBeDefined()        
            expect(res.body[0].genres).toHaveLength(0)
    
  })


  test("GET -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${directorId}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)

        expect(res.body.movies).toBeDefined()
        expect(res.body.movies).toHaveLength(0) 
        expect(res.body.genres).toBeDefined()
        expect(res.body.genres).toHaveLength(0) 
  
  })

 test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.firstName ==== directorUpdate.firstName  ", async () => {

    const directorUpdate = {
        firstName: "Carlos",
        lastName: "Gomez",
        dateOfBirth: "1946-12-18",
        country: "MExico",
    }
    const res = await request(app)
      .put(`${BASE_URL}/${directorId}`)
      .send(directorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
    
  })

  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${BASE_URL}/${directorId}`)
       expect(res.statusCode).toBe(204)
  })

  