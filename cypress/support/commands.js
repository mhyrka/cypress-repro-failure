Cypress.Commands.add('launchURL', () => {
  cy.visit('/')
  const cn = 'someCookie'
  cy.setCookie(cn, 'someDummyValue')
  cy.wait(100)
})

Cypress.Commands.add('printLog', (message) => {
  cy.task('log', message)
})