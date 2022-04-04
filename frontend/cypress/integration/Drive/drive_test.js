it.only('map close',function()
{
   cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("activetrip@gmail.com")
    cy.get('[data-test="password-form-control"]').type("activetrip")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

   cy.get('[data-test="drive-button"]').click()
   cy.get('[data-test="source-button"]').click()
   cy.get('[data-test="model-body"]').click()
   cy.get('[data-test="close-button"]').click()
   
})

it.only('drive test',function()
{
   // Repeating drive for 2 users (One for 'done' and other for 'cancel')
   let userid = ["activetrip@gmail.com","activetrip1@gmail.com"]
   let password = ["activetrip","activetrip1"]
   for(let i=0; i<2; i++){
      cy.visit ("http://localhost:3000/login") 

      cy.get('[data-test="email-form-control"]').type(userid[i])
      cy.get('[data-test="password-form-control"]').type(password[i])
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
      cy.get('[data-test="map-search"]').type("62 University Avenue East")
      cy.wait(1000)
      cy.get('.pac-item', { timeout: 10000 }).should('be.visible');
      cy.get('[data-test="map-search"]').type('{downarrow}');
      cy.get('[data-test="map-search"]').type('{enter}',{delay:100});
      cy.get('[data-test="map-select"]').click()

      cy.get('.form-select').select('One')
      cy.wait(1000)
      cy.get('[data-test="drive-submit-button"]').click()
      cy.wait(2000)

      cy.get('#hamburger').click()

    cy.get('[data-test="logout-button"]').click()
   }
})

