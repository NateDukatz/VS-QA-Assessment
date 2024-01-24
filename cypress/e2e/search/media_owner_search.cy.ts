describe('media owner search', () => {
  beforeEach(() => {
    cy.dismissPopups()
    cy.intercept('GET', '**hs-search-results**').as('search')
    cy.visit('/supply-side-platform')
  })

  it('tests for proper handling of sql injection attempts', () => {
    cy.get('#site-header__search-trigger').click()
    // this search should be blocked as a potential sql injection attempt
    cy.get('input[id="site-header__search-input"]').type('\\ OR 1=1;--{enter}')
  // making sure the search request is blocked
  cy.wait('@search')
    .its('response.statusCode')
    .should('eq', 403)
  })
})