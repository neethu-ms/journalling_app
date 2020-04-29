import React from 'react';
import '../../styles/Bio.scss';
import { Button, Container, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  btnColor: {
    background: "#03A9F4",
    '&:hover': {
      background: "#03A9F4",

    },

    bioContainer: {
      display: "flex",
      alignItems: "center"
    }

  },


});
export default function UserBio(props) {
  const classes = useStyles();
  return (
    <Container className={classes.bioContainer}>
     
      <p>{props.bio}</p>
      <Button
        variant="contained"
        color="secondary"
        className={classes.btnColor}
        onClick={props.onClick}
        disabled={props.disabled}>
        GET INSIGHTS
     </Button>
    </Container>
  )
}