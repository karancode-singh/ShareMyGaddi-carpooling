it.only('login test',function()
{
    cy.visit ("/login") 
     
    if(cy.get('[data-test="login-form"]').length >0){
        console.log("login button is present")
    }

    cy.get('[data-test="email-form-control"]').type("user1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("user1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

//     cy.get('.navbar').click()   
//    cy.get('[data-test="drive-button"]').click()
//    cy.get('[data-test="ride-button"]').click()
// it.only('drive test',function()
// {
//     cy.visit ("http://localhost:3000/drive")      
//    cy.get('[data-test="source-button"]').click()
//    cy.get('[data-test="destination-button"]').click()
//    cy.get('.col-auto > [data-test="ride-button"]').click()

// })
// it.only('Ride test',function()
// {    
//     cy.visit ("http://localhost:3000/ride") 
//    cy.get('[data-test="destination-button"]').click()
//    cy.get('[data-test="source-button"]').click()
//    cy.get('.col-auto > [data-test="ride-button"]').click()

})

it.only('login test fail',function()
{
    cy.visit ("/login") 
     
    if(cy.get('[data-test="login-form"]').length >0){
        console.log("login button is present")
    }

    cy.get('[data-test="email-form-control"]').type("user1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("user2")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)
})

