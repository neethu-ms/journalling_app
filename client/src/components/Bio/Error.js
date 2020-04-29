import React from "react";
import {Button, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  btnColor:{
    background : "#03A9F4",
    '&:hover':{
      background : "#03A9F4",
      
    }
    
  }
});
export default function Error(props) {
  const classes = useStyles();
  return (
     <Container>
      <h4 className="">{props.message}</h4>
      <Button 
       variant="contained" 
           color="secondary"
           className={classes.btnColor}
       onClick={props.onCancel}>
         BACK
      </Button>
      </Container>
  );
}