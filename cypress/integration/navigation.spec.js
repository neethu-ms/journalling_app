describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  // It should REGISTER a user
  it("registers user", () => {
    cy.request("GET", "https://journalling-api.herokuapp.com/api/db/reset");
    cy.visit("/");
    cy.contains("REGISTER").click();
    cy.contains("Email Address").type("test4@gmail.com");
    cy.get("#password").type("test4");
    cy.get("#biodata").type(
      "I am a carpenter. I would like to make myself organized and motivated."
    );
    cy.contains("Submit").click();
    cy.contains("LOGOUT").click();
    cy.contains("OK").click();
  });
  // It should LOGIN a user and logout
  it("Login user", () => {
    cy.visit("/");
    cy.contains("LOGIN").click();
    cy.contains("Email Address").type("test4@gmail.com");
    cy.get("#password").type("test4");
    cy.contains("Submit").click();
    cy.contains("LOGOUT").click();
    cy.contains("OK").click();
  });

  it("Level 1 user insights should show a message", () => {
    cy.visit("/");
    cy.contains("LOGIN").click();
    cy.contains("Email Address").type("test4@gmail.com");
    cy.get("#password").type("test4");
    cy.contains("Submit").click();
    cy.contains("GET INSIGHTS").click();
    cy.contains("Your Personality Analysis").should("not.exist");
    cy.contains("Reach level 10 to access your insights!").should("exist");
    cy.contains("BACK").click();
    cy.contains("LOGOUT").click();
    cy.contains("OK").click();
  });

  it("User posts multiple messages and it appears in wall", () => {
    cy.visit("/");
    cy.contains("LOGIN").click();
    cy.contains("Email Address").type("test4@gmail.com");
    cy.get("#password").type("test4");
    cy.contains("Submit").click();
    cy.wait(1000);
    cy.contains("goal").click();
    cy.get("#filled-textarea").type("do exercise");
    cy.contains("Answer").click();
    cy.wait(1000);
    cy.contains("goal").click();
    cy.get("#filled-textarea").type("Meet some friends");
    cy.contains("Answer").click();
  });
});
