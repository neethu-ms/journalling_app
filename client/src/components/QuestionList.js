import "./QuestionAnswer/styles.scss";

import React, { useState } from "react";

import AnswerQuestionPanel from "./QuestionAnswer/AnswerQuestionPanel";

import Slide from "@material-ui/core/Slide";
import { Container } from "@material-ui/core";

export default function QuestionList(props) {
  const questionsList = props.filteredGoals.map((goal, i) => {
    return (
      <div>
        <Slide direction="up" in={false}>
          <AnswerQuestionPanel
            key={i}
            question={goal.question}
            suggestion={goal.suggestion}
            setAnswer={props.setAnswer}
            goal_id={goal.id}
            addUserGoal={props.addUserGoal}
            currentUserId={props.currentUserId}
            setExpanded={props.setExpanded}
            expanded={props.expanded}
          />
        </Slide>

        <br />
      </div>
    );
  });
  return (
    <section>
      <Container className="questions">
        <h2 className="title">Question Feed</h2>

        {questionsList}
      </Container>
    </section>
  );
}
