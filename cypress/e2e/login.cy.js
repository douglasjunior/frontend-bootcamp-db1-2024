describe('login', () => {
  it('should login with success', () => {
    cy.visit('http://localhost:5173')

    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('nassifrroma@gmail.com')

    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('senha123')

    cy.get('.ant-form > .ant-btn').click();

    cy.get('.ant-menu-item-selected > .ant-menu-title-content')
      .should('contain', 'Minhas tarefas')

    cy.url().should('include', '/tasks')
  })

  it('should fail the login with wrong user or password', () => {
    cy.visit('http://localhost:5173')

    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('nassifrroma@gmail.com')

    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('senha1234')

    cy.get('.ant-form > .ant-btn').click();

    cy.get('.ant-modal-confirm-title')
      .should('contain', 'Usuário ou senha inválidos')

    cy.url().should('include', '/login')
  })
})
