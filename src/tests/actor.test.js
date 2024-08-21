
require('../models')
const request = require('supertest')
const app = require('../app')     
const Genre = require('../models/Genre')

const BASE_URL = '/api/v1/actors'

let actorId 
const actor = {
    firstName: "Juan",
    lastName:"Gachancipa",
    dateOfBirth: 1995-5-10,
    country:"Colombia"
}


test ("POST -> BASE_URL, should return suatusCode 201, and res.body.firstName === actor.firstName", async () => {
    
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)
    
    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)

}) 


 test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
        
        
        const res = await request(app)
        .get(BASE_URL)
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength(1); 

            console.log('Response code:', res.status); // Verifica el cuerpo de la respuesta
        
            expect(res.body[0].movies).toBeDefined()
            expect(res.body[0].movies).toHaveLength(0)

            expect(res.body[0].genres).toBeDefined()        
            expect(res.body[0].genres).toHaveLength(0)

    })



test("GET -> BASE_URL/actorId, should return statusCode 200, and res.body.actor === actor.firstName", async () => {
    
    
    const res = await request(app)
    .get(`${BASE_URL}/${actorId}`) 

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(actor.firstName);



        expect(res.body.movies).toBeDefined()
        expect(res.body.movies).toHaveLength(0) 
        expect(res.body.genres).toBeDefined()
        expect(res.body.genres).toHaveLength(0) 
})


test("PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.actor === actorUpdate.firstName", async () => {
    
    
    const actorUpdate = {
        firstName : "David"
    }

    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate) 

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.firstName).toBe(actorUpdate.firstName);

 
}) 


test(" POST -> BASE_URL/:id/students,  should return statusCode 200, and res.body.length === 1",async () => {

    const genre = {
        name: "Fantasy"
    }

    const createGenre = await Genre.create(genre)

    const res = await request(app)
    .post(`${BASE_URL}/${actorId}/genres`)
    .send([createGenre.id]) 
    

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()

    await createGenre.destroy()

})

test("DELETE -> BASE_URL/actorId, should return statusCode 204", async () => {
    
  
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)
    expect(res.statusCode).toBe(204)
 
})