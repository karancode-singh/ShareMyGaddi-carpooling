it.only('active trip done',function()
{   
    cy.visit ("/login") 

    cy.get('[data-test="email-form-control"]').type("activetrip@gmail.com")
    cy.get('[data-test="password-form-control"]').type("activetrip")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

    cy.get('#doneTripButton').click()
    cy.wait(2000)
})

it.only('active trip cancel',function()
{   
    cy.visit ("/login") 

    cy.get('[data-test="email-form-control"]').type("activetrip1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("activetrip1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(2000)

    cy.get('#cancelTripButton').click()
    cy.wait(2000)
})
