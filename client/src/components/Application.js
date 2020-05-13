import React from "react";
import Wall from "./Wall";
import Bio from "./Bio/Index";
import Navbar from "./Navbar";
import QuestionList from "./QuestionList";
import useApplicationData from "../hooks/useApplicationData";
import { Container } from "@material-ui/core";
import "./Application.scss";
import { getLevel } from '../helpers/goalHelper';
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
    setExpanded,
  } = useApplicationData(); // Gets required functions and state information

  

  const bio = state.biodatas.filter(
    (biodata) => biodata.user_id === state.currentUser
  )[0]; // Gets biodata for current user
  const userObj = state.users.filter(
    (user) => user.id === state.currentUser
  )[0]; // Gets current user object
  const level = getLevel(userObj); // Get users level
 
  const filteredGoals = state.goals.slice(0, level <= 15 ? level : 15);
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
          />
          {state.currentUserGoals.length > 0 && (
            <Wall
              userGoals={state.currentUserGoals}
              userId={state.currentUser}
              handleDelete={handleDelete}
            />
          )}
        </section>
      )}
      {!state.currentUser && (
        <section>
          <Container>
            <h3 className="intro">
              Everybody has the power to remodel their behaviour, habits, and
              attitudes, but not everybody knows how. Our app will make it
              simple and rewarding for anybody to get the benefits of reflective
              journaling. Our app will bring people together through personal
              goals, challenges, and insights, so that we can realize our
              potential together
            </h3>
            <hr className="seperator" />
            <h4 className="text--regular intro-start">
              Please Log in to Start or Continue your Journey
            </h4>
          </Container>
        </section>
      )}
    </main>
  );
}
