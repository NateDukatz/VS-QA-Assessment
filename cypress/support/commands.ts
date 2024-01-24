import '@testing-library/cypress/add-commands'

/* this command is for ignoring the popups that appear 
on the site rather than having to manually click through them. 
this is useful because cypress clears the cache and storage between tests.
the session method allows this state to persist through all the tests within a single spec */
Cypress.Commands.add('dismissPopups', () => {
  cy.session('dismissPopups', () => {
    cy.setCookie('__hs_initial_opt_in', 'true')
    localStorage.setItem('WI_FREQUENCY_152896829964', '{"frequency":"REPEAT_ONCE","backoffTimeDuration":2,"backoffTimeUnit":"WEEKS","timeSaved":1705984471205}')
  })
})