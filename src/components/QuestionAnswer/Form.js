import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Form(props) {
  const [answer, setAnswer] = useState("");
  return (
    
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <TextField
          id="filled-textarea"
          value={answer}
          placeholder={props.suggestion}
          multiline
          fullWidth
          variant="filled"
          onChange={(e) => {
            props.setAnswer(e.target.value);
            setAnswer(e.targetValue);
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={(e) => {
            props.setExpanded(props.goal_id);
            props.addUserGoal({ goal_id: props.goal_id });
            props.setAnswer("");
            setAnswer("");
          }}
        >
          Answer
        </Button>
      </form>
    
  );
}
