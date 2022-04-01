it.only('trip history test',function()
{   
  
    cy.visit ("http://localhost:3000/login") 

    cy.get('[data-test="email-form-control"]').type("user1@gmail.com")
    cy.get('[data-test="password-form-control"]').type("user1")
    cy.get('[data-test="login-button"]').click()
    cy.wait(3000)
})
