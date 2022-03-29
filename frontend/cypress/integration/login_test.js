it.only('login test',function()
{
    cy.visit ("http://localhost:3000/login")   
    cy.get('[data-test="login-form"]').click()
   // cy.get('.signup-link').click()
   cy.get('.navbar').click()
})
