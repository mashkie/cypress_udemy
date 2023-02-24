/// <reference types="Cypress" />

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello world!");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // el is a wraper object that wraps the selected element/s
      expect(el.attr("dissabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.screenshot()
    cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}");
    // cy.get('[data-cy="contact-btn-submit"]')
    // .contains('Send Message')
    // .and('not.have.attr', 'disabled'); // and() is just a alias for should()
    cy.screenshot()
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    // cy.get('@submitBtn').click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");

    cy.get('[data-cy="contact-input-message"]').as("msgInput");
    cy.get("@msgInput").focus().blur();
    cy.get("@msgInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-name"]').as("msgName");
    cy.get("@msgName").focus().blur();
    cy.get("@msgName")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-email"]').as("msgMail");
    cy.get("@msgMail").focus().blur();
    cy.get("@msgMail")
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).contains('invalid');
      });
  });
});
