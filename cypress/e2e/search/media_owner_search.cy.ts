describe('media owner search', () => {
  beforeEach(() => {
    cy.dismissPopups()
    cy.intercept('GET', '**hs-search-results**').as('search')
    cy.visit('/supply-side-platform')
  })

  it('tests for proper handling of sql injection attempts', () => {
   cy.get('#site-header__search-trigger').click()
   cy.get('#site-header__search-form').type('\\ OR 1=1;--')
  cy.get('#site-header__search-submit').click()
  // this is a negative test to make sure the search request is blocked
  cy.wait('@search')
    .its('response.statusCode')
    .should('eq', 403)
  })
})