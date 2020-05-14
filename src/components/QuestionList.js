import "./QuestionAnswer/styles.scss";
import React from "react";
import AnswerQuestionPanel from "./QuestionAnswer/AnswerQuestionPanel";
import { Container } from "@material-ui/core";

export default function QuestionList(props) {
  const questionsList = props.filteredGoals.map((goal, i) => {
    return (
      <div key={i}>
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
