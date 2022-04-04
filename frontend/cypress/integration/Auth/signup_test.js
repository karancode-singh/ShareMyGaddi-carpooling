it.only('signup test',function()
{
    cy.visit ("/signup") 

    cy.get('[data-test="first-name-form-control"]').type("New")
    cy.get('[data-test="last-name-form-control"]').type("User")
    cy.get('[data-test="email-form-control"]').type("newuser@gmail.com")
    cy.get('[data-test="password-form-control"]').type("newuser")
    cy.get('[data-test="conf-password-form-control"]').type("newuser")
    cy.get('[data-test="signup-button"]').click()
    cy.get('#hamburger').click()

    cy.get('[data-test="delete-button"]').click()
    cy.wait(1000)
})

it.only('signup test fail',function()
{
    cy.visit ("/signup") 

    cy.get('[data-test="first-name-form-control"]').type("New")
    cy.get('[data-test="last-name-form-control"]').type("User")
    cy.get('[data-test="email-form-control"]').type("user1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("newuser")
    cy.get('[data-test="conf-password-form-control"]').type("newuser")
    cy.get('[data-test="signup-button"]').click()

    cy.wait(1000)
})


