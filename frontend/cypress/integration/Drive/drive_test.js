it.only('drive test',function()
{
    cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("driver1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("driver1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

   cy.get('[data-test="drive-button"]').click()
     
   cy.get('[data-test="source-button"]').click()
   cy.get('[data-test="map-search"]').type("69 Columbia Street West")
   cy.wait(1000)
   cy.get('.pac-item', { timeout: 10000 }).should('be.visible');
   cy.get('[data-test="map-search"]').type('{downarrow}');
   cy.get('[data-test="map-search"]').type('{enter}',{delay:100});
   cy.get('[data-test="map-select"]').click()

   cy.get('[data-test="destination-button"]').click()
   cy.get('[data-test="map-search"]').type("62 University Aveneue East")
   cy.wait(1000)
   cy.get('.pac-item', { timeout: 10000 }).should('be.visible');
   cy.get('[data-test="map-search"]').type('{downarrow}');
   cy.get('[data-test="map-search"]').type('{enter}',{delay:100});
   cy.get('[data-test="map-select"]').click()

   cy.get('.form-select').select('One')
   cy.get('[data-test="drive-submit-button"]').click()

})

it.only('map close',function()
{
   cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("driver1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("driver1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

   cy.get('[data-test="drive-button"]').click()
   cy.get('[data-test="source-button"]').click()
   cy.get('[data-test="model-body"]').click()
   cy.get('[data-test="close-button"]').click()
   
})

