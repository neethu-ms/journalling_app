import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Form from "./Form"
import '../../styles/questionAnswer.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    
  },

  panel:{
   // background: "linear-gradient(to bottom, #00ccff -1%, #99ccff 92%)"
    //backgroundColor:"#ccffff"
    //background: "linear-gradient(to top right, #00ffcc 0%, #00cc99 100%)"
   // background: "linear-gradient(to bottom, #ccffff 0%, #66ccff 100%)"
   //background: "linear-gradient(to bottom, #996633 0%, #333300 100%)",
   backgroundColor:"#039be5",
   color: "white"
  },

  formStyle:{
    //backgroundColor:"#ccffff"
    //background: "linear-gradient(to bottom, #ff9900 0%, #ffffff 100%)"
    backgroundColor:"#81d4fa"
  },

  topo:{
    width:"100%"
  }


}));

export default function SimpleExpansionPanel(props) {
  console.log("props.expanded",props.expanded);
  const classes = useStyles();
  console.log(props.expanded[""+props.goal_id]);
  return (
    <ExpansionPanel expanded={props.expanded[props.goal_id]===true?true:false}>
      <ExpansionPanelSummary className={classes.panel} onClick={() => props.setExpanded(props.goal_id)}
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
        
      >
        <Typography className={classes.heading}>{props.question}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.formStyle}>
        <Typography className={classes.topo}> 
          <Form
            setAnswer = {props.setAnswer}
            goal_id = {props.goal_id}
            addUserGoal = {props.addUserGoal}
            giveAnswer={props.giveAnswer}
            suggestion={props.suggestion}
            currentUserId={props.currentUserId}
            goalId={props.goalId}
            setExpanded={props.setExpanded}
            answer = {props.answer}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
