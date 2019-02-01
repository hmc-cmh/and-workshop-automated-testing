describe('My First Test', () => {
  it('The textbooks displays with a message!', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-test-id="textfield"]').contains('What do you want to do?');
  });

  it('The button is disabled before the user types', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-test-id="fabbutton"]').should('be.disabled');
  });

  it('The button is active when the user types', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-test-id="fabbutton"]').should('be.disabled');
    cy.get('[data-test-id="textfield"] > div  > input').type('Finish testing');
    cy.get('[data-test-id="fabbutton"]').should('be.enabled');
  });

  it('Adds todo', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type('Finish testing');
    cy.get('[data-test-id="fabbutton"]').click();
    cy.get('[data-test-id="list"]')
      .children()
      .last()
      .contains('Finish testing');
  });

  it('Deletes todo', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type('For delete');
    cy.get('[data-test-id="fabbutton"]').click();
    cy.get('[data-test-id="list"]')
      .children()
      .last()
      .contains('For delete');

    cy.get('[data-test-id="list"]')
      .children()
      .last()
      .within(() => cy.get('[data-test-id="bin"]').click());

    cy.get('[data-test-id="list"]')
      .children()
      .last()
      .contains('For delete')
      .should('not.exist');
  });

  it('Marks todo item as completed', () => {
    cy.get('[data-test-id="list"]')
      .children()
      .last()
      .within(() => cy.get('[data-test-id="check"]').click());

    cy.get('[data-test-id="list"]')
      .children()
      .last()
      .within(() => cy.get('[data-test-id="check"]').should('be.checked'));
  });
});
