import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  return (
    <main >
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <TextField
          id="filled-textarea"
          label={props.suggestion}
          placeholder={props.suggestion}
          multiline
          fullWidth
          value={props.answer}
          variant="filled"
          onChange={(e) => props.setAnswer(e.target.value)}
        />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => {
            props.setExpanded(props.goal_id);
            props.addUserGoal({ goal_id: props.goal_id });
            props.setAnswer("");

          }
          }
        >
          Answer
      </Button>
      </form>
    </main>
  );
}