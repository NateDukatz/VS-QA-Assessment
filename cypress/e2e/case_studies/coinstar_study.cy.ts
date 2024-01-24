import DownloadUri from "../../support/utils/downloadUri"

const urlString = 'coinstar-vistar-saas-case-study'

describe('coinstar study', () => {
  beforeEach(() => {
    
    // using custom command here
    cy.dismissPopups()
    
    /* sometimes I like to put intercepts in a separate files that can 
     be organized by product/page for reuse in multiple test files */
    cy.intercept('POST', 'https://px.ads.linkedin.com/wa/').as('formSubmit')
  })

  it('fills out and submits form, downloads case study and verifies download', () => {
    cy.visit(`/${urlString}`)
    
    /* some of these elements could potentially be 
    turned into variables in for reuse in other tests 
    example: const nameInput = cy.get('input[name=firstname]') 
    then in the test: nameInput.type('Test') */
    cy.get('input[name=firstname]').type('Test')
    cy.get('input[name=lastname]').type('User')
    cy.get('input[name=email]').type('natedukatz@gmail.com')
    cy.get('select[name=company_type]').select('Other')
    cy.get('input[type="submit"]').click()
    cy.wait('@formSubmit')
      .its('response.statusCode')
      .should('eq', 204)
  })

  /* these could potentially be combined into one test as this would be the next step in the user flow
  after the previous test. I split them up for better readablity and stability */
  it('downloads case study and verifies download', () => {
    cy.visit(`typ-${urlString}?submission`)
    // using cypress-testing-libray plugin here
    cy.findByText('Download').scrollIntoView().invoke('attr', 'href').then((href) => {
      DownloadUri.download(href, 'Vistar Media_Coinstar_CaseStudy_SaaS.pdf')
    })
    // this is using the cy-verify-dowloads plugin
    cy.verifyDownload('Vistar Media_Coinstar_CaseStudy_SaaS.pdf')
  })

  // more tests related to this case study page/product would go here
})