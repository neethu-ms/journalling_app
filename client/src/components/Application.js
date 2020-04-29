import React from 'react';
import Wall from './Wall';
import Bio from "./Bio/Index";
import Navbar from "./Navbar";
import QuestionList from "./QuestionList";
import "./LogoutPrompt.scss";
import useApplicationData from "../hooks/useApplicationData";
import { Container } from '@material-ui/core';
import "./Application.scss";


export default function Application() {

  const {
    logInUser,
    logoutUser,
    state,
    requestInsight,
    addUserGoal,
    setAnswer,
    createUser,
    handleDelete,
    setExpanded
  } = useApplicationData();  // Gets required functions and state information 

  const bio = state.biodatas.filter((biodata) => biodata.user_id === state.currentUser)[0]; // Gets biodata for current user
  const userObj = state.users.filter((user) => user.id === state.currentUser)[0]; // Gets current user object
  console.log("userObj,userObj");
  let level;
  let extraPoints = 0;
  if (userObj) {
    if(userObj.points > 100){
      extraPoints = userObj.points - 100;
    }
    let computedLevel = Math.floor((userObj.points-extraPoints) / 10);  // Till level 10, earning 10 points will lead to next level starting from level 2
    computedLevel = computedLevel + Math.floor((extraPoints) / 100); // After level 10, earning 100 points will lead to next level
    level = (computedLevel>=1?computedLevel:1).toFixed(); // Level is computed from points. Initial level is 1 and will lead to level 2 once user earns 20 points.
    console.log("level",level);
  }

  const filteredGoals = state.goals.slice(0, level<=15?level:15);
  const questionsArr = filteredGoals.map((goal) => goal.question);

  return (
    <main className="layout">
      <Navbar
        users={state.users}
        logInUser={logInUser}
        logoutUser={logoutUser}
        user={state.currentUser}
        createUser={createUser}
      />
      {state.currentUser && (
        <section className="feed">

          <Bio
            bio={bio ? bio.text : ""}
            level={level}
            requestInsight={requestInsight}
            currentUserGoals={state.currentUserGoals}
            userInsight={state.currentUserInsight}
          />

          <QuestionList
            questions={questionsArr}
            setAnswer={setAnswer}
            addUserGoal={addUserGoal}
            goals={state.goals}
            currentUserId={state.currentUser}
            filteredGoals={filteredGoals}
            createUser={createUser}
            setExpanded={setExpanded}
            expanded={state.expanded}
            answer = {state.answer}
          />
          <Wall userGoals={state.currentUserGoals} userId={state.currentUser} handleDelete={handleDelete} />
        </section>
      )}
      {state.currentUser === null && (
        <section>
          <Container>
            <h3 className="intro">Everybody has the power to remodel their behaviour, habits, and attitudes, but not everybody knows how. Our app will make it simple and rewarding for anybody to get the benefits of reflective journaling. Our app will bring people together through personal goals, challenges, and insights, so that we can realize our potential together </h3>
            <hr className="seperator" />
            <h4 className="text--regular intro-start">Please Log in to Start or Continue your Journey</h4>
          </Container>
        </section>
      )}

    </main>
  );
}