import React from "react";
import "./Profile.scss"
import { Container, Avatar, FormHelperText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  levelStyle:{
    backgroundColor:"#03A9F4",
    height: "50px",
    width:"100px",
    color:"black",
    alignSelf:"center"
  },

  containerStyle:{
    display:"flex",
      alignItems:"flex-end"
  }
      
    }
    
);

export default function UserBio(props) {
  const classes = useStyles();
  return (
    <aside className="" id="">
      <Container className={classes.containerStyle}>
       
        <Avatar variant="square" className={classes.levelStyle}>Level:{props.level}</Avatar>
          {/*<h4 className="">Level: {props.level}</h4>*/}
               
      </Container>
    </aside>
  );
}