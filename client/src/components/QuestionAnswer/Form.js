import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

export default function Form(props){

    // below we update state
    const [ans, setAns] = useState() 

    //  cancel the form so form goes away
    const reset = () => {
        setAns(null);
    } 
    const cancel = () => {
        reset();
        // props.onCancel();
    }

    const getAns = () => {
        console.log("getAns", ans)
        return ans;
    }
  
  return (
    <main className="prompt__card prompt__card--create">
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
        <TextField
          id="filled-textarea"
          label="Write your Answer Here"
          placeholder="You can do it!!!"
          multiline
          fullWidth
          variant="filled"
          onChange={(e) => setAns(e.target.value)}
        />
        <section className="prompt__actions" size="large">
          <ButtonGroup color="primary" fullwidth>
            <Button variant="outlined" color="primary" onClick={cancel}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => console.log(getAns())}
            >
              Public
            </Button>
            <Button
              variant="outlined" //text contained
              color="primary" // default primary secondary disabled link
              size="large"
              onClick={() => console.log(ans)}
            >
              Private
            </Button>
          </ButtonGroup>
        </section>
      </form>
    </main>
  );
}