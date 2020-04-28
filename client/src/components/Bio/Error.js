import React from "react";
import {Button} from '@material-ui/core';

export default function Error(props) {
  return (
    <main className="">
      <img
        className=""
        src="images/status.png"
        alt="Keep it up!"
      />
      <h4 className="">{props.message}</h4>
      <Button 
       variant="contained" 
           color="secondary"
           className="button"
       onClick={props.onCancel}>
         BACK
      </Button>
    </main>
  );
}