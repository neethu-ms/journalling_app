import React from 'react';
import {Button, Box, Card, CardContent, Typography, CardActions, colors} from '@material-ui/core';
import './Profile.scss';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor:"#fff59d"
       
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
    textAlign:"center"
    
  },

  content: {
    fontSize: 20,
    fontFamily: "'Philosopher', sans-serif"
    
    //fontWeight:"bold"
   
  },

  pos: {
    marginBottom: 12,
  },

  btnColor:{
    background : "#03A9F4",
    '&:hover':{
      background : "#03A9F4",
      
    }
    
  }
});
export default function Insights(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return(
    <article>
      {/* <h4 className="insight-heading"> Here is an analysis of your entries: </h4> /*}
       {/*<p>*/}
        {/*  <Box color="text.primary" className="insights">    /*}
        {props.insights}
        </Box>
       {/* </p> */}
           
     <Card className={classes.root}>
       <CardContent>
         <Typography className={classes.title}  gutterBottom>
           Your Personality Analysis
         </Typography>
         
         <Typography variant="body2" component="p" className={classes.content}>
                  {props.insights}
         </Typography>
       </CardContent>
       <CardActions>
       <Button size="small"
      variant="contained" 
      
       className={classes.btnColor}
       onClick={props.onCancel}
       disabled={props.disabled}>
         BACK
     </Button>
     
       </CardActions>
     </Card>
    </article>
      
  )
}