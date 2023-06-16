// cypress/support/e2e.js
import '@cypress/code-coverage/support'
import './commands'

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from failing the test
  return false
})


async function getSecret () {
  return new Promise(resolve => setTimeout(resolve({ SecretString: JSON.stringify({ username: '999RandomTestUser111@gmail.com', password: 'SomePassword13$' })}), 250))
}

Cypress.Commands.add('login', () => {
  const args = {}
  const baseUrl = 'http://localhost:3000'
  const authOrigin = 'https://dev-xdyoj40jqekxviuk.us.auth0.com'
  Cypress.config('baseUrl', baseUrl)

  cy.wrap(getSecret())
    .then(res => JSON.parse(res.SecretString))
    .then(secret => {
      cy.session(args, () => {
        cy.printLog('Creating session...')
        const { username, password } = secret
        args.username = username
        args.password = password
        cy.visit('/')
        cy.get('.d-none > .nav-item > #qsLoginBtn').click()
        cy.origin(authOrigin, { args }, ({ username, password }) => {
          Cypress.on('uncaught:exception', () => {
            // returning false here prevents Cypress from failing the test
            return false
          })
          // we could do our login here with username / password but I'm seeing the failing behavior now. `
        })
      })
    })
})
