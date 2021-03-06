import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Form from "./Form";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  panel: {
    backgroundColor: "#039be5",
    color: "white",
  },

  formStyle: {
        background: "linear-gradient(to bottom left, #66ccff 6%, #ffffff 106%)",
  },

  topo: {
    width: "100%",
  },
}));

export default function AnswerQuestionPanel(props) {
  const classes = useStyles();
  return (
    <ExpansionPanel
      expanded={props.expanded[props.goal_id] === true ? true : false}
    >
      <ExpansionPanelSummary
        className={classes.panel}
        onClick={() => props.setExpanded(props.goal_id)}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{props.question}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.formStyle}>
        <Typography  component={'span'} className={classes.topo}>
          <Form
            setAnswer={props.setAnswer}
            goal_id={props.goal_id}
            addUserGoal={props.addUserGoal}
            suggestion={props.suggestion}
            currentUserId={props.currentUserId}
            goalId={props.goalId}
            setExpanded={props.setExpanded}
          />
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
