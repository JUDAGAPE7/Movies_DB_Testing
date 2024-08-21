// tests/genre.test.js
require('../models')
const request = require('supertest');
const app = require('../app');


const BASE_URL = '/api/v1/genres';

let genreId;

const genre = {
    name: "Action",
};

test("POST -> BASE_URL, should return statusCode 201 and res.body.name === genre.name", async () =>{
    const res = await request(app)
      .post(BASE_URL)
      .send(genre)

    genreId = res.body.id
      
        
    expect(res.status).toBe(201)
    
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("GET -> BASE_URL, should return statusCode 200, res.body to be defined and res.body.name === genre.name", async () =>{

    const res = await request(app)
       .get(BASE_URL)

        console.log(res.body);
        
    expect(res.status).toBe(200)
   
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movies).toBeDefined()
    expect(res.body[0].movies).toHaveLength(0)

})


test("GET -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name === genre.name", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${genreId}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
    expect(res.body.movies).toBeDefined()
    expect(res.body.movies).toHaveLength(0) 
  
  })

test("PUT -> BASE_URL/:id, should return status code 200, res.body.name === genreUpdate.name", async () => {
    const genreUpdate = {
        name: "Adventure",
    };
    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(genreUpdate.name);
});

test("DELETE -> BASE_URL/:id, should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`);

    expect(res.statusCode).toBe(204);
});
