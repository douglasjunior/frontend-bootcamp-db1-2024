describe('subscription', () => {
  it('should create a new user', () => {
    cy.visit('http://localhost:5173')

    cy.get('span.ant-typography > .ant-btn').click();

    cy.url().should('include', '/subscription')

    const random = Math.round(Math.random() * 1000000);

    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('Usuário de teste ' + random)

    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('fulano' + random + '@email.com')

    cy.get(':nth-child(3) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('senha123')

    cy.get('.ant-form > .ant-btn').click();

    cy.get('.ant-modal-confirm-title')
      .should('contain', 'Usuário cadastrado com sucesso, faça login para continuar.')

    cy.url().should('include', '/login')
  });

  it('should validate duplicated email address', () => {
    cy.visit('http://localhost:5173')

    cy.get('span.ant-typography > .ant-btn').click();

    cy.url().should('include', '/subscription')

    cy.get(':nth-child(1) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('Usuário de teste')

    cy.get(':nth-child(2) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('nassifrroma@gmail.com')

    cy.get(':nth-child(3) > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input')
      .type('senha123')

    cy.get('.ant-form > .ant-btn').click();

    cy.get('.ant-modal-confirm-title')
      .should('contain', 'E-mail já cadastrado no banco de dados.')

    cy.url().should('include', '/subscription')
  });
});
