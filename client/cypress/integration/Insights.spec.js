describe("Insights",()=> {
  it("should visit root",()=>{
    cy.visit("/");
  });

    // It should REGISTER a user user posts messages
  it('registers user',() =>{
       cy.request("GET","http://localhost:3001/api/db/reset");
       cy.visit('/');
       cy.contains("REGISTER").click();
       cy.contains("Email Address").type("test4@gmail.com");
       cy.get("#password").type("test4");
       cy.get("#biodata").type("I am a carpenter. I would like to make myself organized and motivated.");
       cy.contains("Submit").click();
       cy.wait(3000);
     cy.contains("goal").click();
    cy.get("#filled-textarea").type("do exercise");
    cy.contains("Answer").click();
    cy.contains("goal").click();
    cy.get("#filled-textarea").type("Do exercise. Make a complete plan for today's activities. Meet Reena and John. Meet some other friends. Buy grocery. Cook chicken and vegetable salads. Go outside and play badminton. Complete the study plan for this week. Start the new project. See some motivating videos. Read some stories of how people overcome difficult situations.");
    cy.contains("Answer").click();
    cy.contains("goal").click();
    cy.get("#filled-textarea").type("Do exercise. Make a complete plan for today's activities. Meet Reena and John. Meet some other friends. Buy grocery. Cook chicken and vegetable salads. Go outside and play badminton. Complete the study plan for this week. Start the new project. See some motivating videos. Read some stories of how people overcome difficult situations.");
    cy.contains("Answer").click();
    cy.contains("goal").click();
    cy.get("#filled-textarea").type("Do exercise. Make a complete plan for today's activities. Meet Reena and John. Meet some other friends. Buy grocery. Cook chicken and vegetable salads. Go outside and play badminton. Complete the study plan for this week. Start the new project. See some motivating videos. Read some stories of how people overcome difficult situations.");
    cy.contains("Answer").click();
    cy.contains("goal").click();
    cy.get("#filled-textarea").type("Do exercise. Make a complete plan for today's activities. Meet Reena and John. Meet some other friends. Buy grocery. Cook chicken and vegetable salads. Go outside and play badminton. Complete the study plan for this week. Start the new project. See some motivating videos. Read some stories of how people overcome difficult situations.");
    cy.contains("Answer").click();
    cy.contains("LOGOUT").click(); 
    cy.contains("OK").click(); 
});  

it('Level 11 user insights should show insights',() =>{
  cy.visit('/');
  cy.contains("LOGIN").click();
  cy.contains("Email Address").type("test4@gmail.com");
  cy.get("#password").type("test4");
   cy.contains("Submit").click();
  cy.contains("GET INSIGHTS").click(); 
  cy.contains("Your Personality Analysis").should("exist");
});  
});






/* describe("Navigation",()=> {
  it("should visit root",()=>{
    cy.visit("/");
  });


  it('Level 11 user insights should show insights',() =>{
    cy.visit('/');
    cy.contains("LOGIN").click();
    cy.contains("Email Address").type("test4@gmail.com");
    cy.get("#password").type("test4");
     cy.contains("Submit").click();
    cy.contains("GET INSIGHTS").click(); 
    cy.contains("Your Personality Analysis").should("exist");
  }); 
});

 */
