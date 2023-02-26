Cypress.Commands.add("submitForm", () => {
  cy.get('form button[type="submit"').click();
});

Cypress.Commands.addQuery("getById", (id) => {
  const getFn = cy.now("get", `[data-cy="${id}"]`);
  return () => {
    return getFn();
  };
});
