it.only('drive test',function()
{
    cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("driver1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("driver1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

//     cy.get('.navbar').click()   
   cy.get('[data-test="drive-button"]').click()
//    cy.get('[data-test="ride-button"]').click()
// it.only('drive test',function()
// {
//     cy.visit ("http://localhost:3000/drive")      
   cy.get('[data-test="source-button"]').click()
   cy.get('[data-test="map-search"]').type("Waterloo")
   cy.get('[data-test="map-select"]').click()

   cy.get('[data-test="destination-button"]').click()
   cy.get('[data-test="map-search"]').type("Toronto")
   cy.get('[data-test="map-select"]').click()

   cy.get('.form-select').select('One')
   cy.get('[data-test="drive-submit-button"]').click()

})


