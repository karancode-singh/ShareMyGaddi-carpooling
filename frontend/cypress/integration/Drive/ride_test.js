it.only('ride test',function()
{
    cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("rider1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("rider1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

    cy.get('[data-test="ride-button"]').click()
    
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

    cy.get('[data-test="ride-submit-button"]').click()
    cy.wait(2000)

    cy.get('#cancelTripButton').click()
    cy.wait(2000)

})

it.only('ride fail',function()
{
    cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("rider1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("rider1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

    cy.get('[data-test="ride-button"]').click()
    
    cy.get('[data-test="source-button"]').click()
    cy.get('[data-test="map-search"]').type("69 Columbia Street West")
    cy.wait(1000)
    cy.get('.pac-item', { timeout: 10000 }).should('be.visible');
    cy.get('[data-test="map-search"]').type('{downarrow}');
    cy.get('[data-test="map-search"]').type('{enter}',{delay:100});
    cy.get('[data-test="map-select"]').click()

    cy.get('[data-test="destination-button"]').click()
    cy.get('[data-test="map-search"]').type("Wilfred Laurier University")
    cy.wait(1000)
    cy.get('.pac-item', { timeout: 10000 }).should('be.visible');
    cy.get('[data-test="map-search"]').type('{downarrow}');
    cy.get('[data-test="map-search"]').type('{enter}',{delay:100});
    cy.get('[data-test="map-select"]').click()

    cy.get('[data-test="ride-submit-button"]').click()
    cy.wait(2000)
})

