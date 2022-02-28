const {signup} = require('../Controllers/authenticate.js');
const route = require('../Routes/authentication.js')
const { check,validationResult} = require('express-validator');
const app= require("../app");
const request  = require('supertest');
const endpoint = "/api/signup";
const endpoint2 = "/api/signin";
const endpoint3= "/api/signout";
const endpoint4 ="/api/users"

// Unit Test Signup
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


describe(endpoint,()=>{
    it("post"+ endpoint,async ()=>{
        const response =  await request(app)
        .post(endpoint)
        .send({
            
                "name":"A",
                "Lastname":"Baluja",
                "email": "Ad4rwere4@gmil.com",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(422)
       
    })
})
// Integration Test Signup
describe(endpoint,()=>{
    it("post"+ endpoint,async ()=>{
        const response =  await request(app)
        .post(endpoint)
        .send({
            
                "name":"user126",
                "Lastname":"user_surname",
                "email": "user126@gmil.com",
                "password":"user124"
            
        })
        expect(response.status).toEqual(200)
        
    })
})

//Unit Test SignIn
describe(endpoint2,()=>{
    it("post"+ endpoint2,async ()=>{
        const response = await request(app)
        .post(endpoint2)
        .send({
            
                
                
                "email": "B@gmail.com",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(400)
    })
    
    
})

describe(endpoint2,()=>{
    it("post"+ endpoint2,async ()=>{
        const response = await request(app)
        .post(endpoint2)
        .send({
            
                
                
                "email": "Ad4rwere4@gmil.com",
                "password":"rahul1"
            
        })
        expect(response.status).toEqual(401)
        
    })
    
})
// Integration test SignIn
describe(endpoint2,()=>{
    it("post"+ endpoint2,async ()=>{
        const response = await request(app)
        
        .post(endpoint2)
        .send({
            
                
                
                "email": "Ad4rwere4@gmil.com",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(200)
        
    })
    
    
})

describe(endpoint2,()=>{
    it("post"+ endpoint2,async ()=>{
        const response = await request(app)
        
        .post(endpoint2)
        .send({
            
                
                
                "email": "B@gmail.com",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(400)
        
    })
    
})
describe(endpoint2,()=>{
    it("post"+ endpoint2,async ()=>{
        const response = await request(app)
        .post(endpoint2)
        .send({
            
                
                
                "email": "Ad4rwere4",
                "password":"rahul123"
            
        })
        expect(response.status).toEqual(422)
        
    })
    
    
})



describe(endpoint3,()=>{
    
    it("get"+ endpoint3,async ()=>{
        const response =  await request(app)
        .get(endpoint3)
        expect(response.status).toEqual(400)
       
    })
})

describe(endpoint4,()=>{
    
    it("get"+ endpoint4,async ()=>{
        const response =  await request(app)
        .get(endpoint4)
        expect(response.status).toEqual(200)
    })

    
})
