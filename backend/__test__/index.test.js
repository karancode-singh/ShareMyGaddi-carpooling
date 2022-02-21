const {signup} = import('../Controllers/authenticate.js');
const User = import("../Models/user")
const route = import('../Routes/authentication.js')
const app= import("../app");
const request  = import('supertest');
const endpoint = "/api/signup";
const endpoint2 = "/api/signin";
describe(endpoint,()=>{
    it("post"+ endpoint,async ()=>{
        const response =  await request(app)
        .post(endpoint)
        .send({
            
                "name":"ABCDEQwwwR",
                "Lastname":"Baluja",
                "email": "Ad4rwere4@gmil.com",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(400)
    })
})
/*
describe(endpoint2,()=>{
    it("post"+ endpoint2,async ()=>{
        const response = await request(app)
        .post(endpoint2)
        .send({
            
                
                
                "email": "B@gmail.com",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(200)
    })
})
*/