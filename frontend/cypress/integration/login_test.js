it.only('login test',function()
{
    cy.visit ("http://localhost:3000/login") 
     
    if(cy.get('[data-test="login-form"]').length >0){
        console.log("login button is present")
    }

//     cy.get('[data-test="login-form"]').click()
//     cy.get('.navbar').click()   
//    cy.get('[data-test="drive-button"]').click()
//    cy.get('[data-test="ride-button"]').click()
})
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

// })

