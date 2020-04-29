import React from 'react';
import WallItem from './WallItem';
import { Timeline} from 'react-event-timeline'
import  {styles}  from './WallStyles';
import '../styles/Wall.scss';
import { Container } from '@material-ui/core';
export default function Wall(props) {
  const userGoals = props.userGoals;
  const userGoalsView = userGoals.map(userGoal => {
    return (
      <WallItem id={userGoal.id} key={userGoal.id} createdAt={userGoal.createdAt} question={userGoal.question} answer={userGoal.answer} handleDelete={props.handleDelete}/>
    );
  }
  );

  return (
    <Container className ="timeline">
      <h2 className="title">Timeline</h2>
      <Timeline lineStyle={styles.lineStyle}>
        {userGoalsView}
      </Timeline>
    </Container>
  );
}