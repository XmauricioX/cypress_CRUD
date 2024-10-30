
describe('Admin login', () => {
  it('login and close succes', () => {
    cy.visit('http://localhost/inventario/')
    cy.get('input[name=login_usuario]').type('Administrador')
    cy.get('input[name="login_clave"]').type('Administrador')
    cy.get('.button').click()
    cy.visit('http://localhost/inventario/index.php?vista=home')
    cy.get(".navbar-burger").click();
    cy.get('.is-link').click();
  });

  it('Close account', () => {
    // separar lo de arriba y dejar aca solo login y cerrar
  });

  it('login username fail', () => {
    cy.visit('http://localhost/inventario/')
    cy.get('input[name=login_usuario]').type('Admin')
    cy.get('input[name="login_clave"]').type('Administrador')
    cy.get('.button').click()
    cy.get('.notification').should('exist')
  });

  it('Login password fail', () => {
    cy.visit('http://localhost/inventario/')
    cy.get('input[name=login_usuario]').type('Administrador')
    cy.get('input[name="login_clave"]').type('Admin')
    cy.get('.button').click()
    cy.get('.notification').should('exist')
  });
})

