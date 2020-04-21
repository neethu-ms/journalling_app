import React from 'react';
import Wall from './Wall';
import Bio from "./Bio/Index";
import LogoutPrompt from "./LogoutPrompt";
import Navbar from "./Navbar";
import QuestionList from "./QuestionList";
import "./LogoutPrompt.scss";
import useApplicationData from "../hooks/useApplicationData";
import {answeredGoals} from "../helpers/filterbyToday"

export default function Application() {
    
  const {
    loggedInUser,
    loggedOutUser,
    ansQuestion,
    state,
    requestInsight,
    addUserGoal,
    setAnswer
  } = useApplicationData();
  console.log("------ state ------\n", state)

//const questionsArr = state.goals.map((goal) => goal.question);

  const bio = state.biodatas.filter((biodata) => biodata.user_id === state.currentUser)[0];

const questions = [...state.goals]
let shuffledQuestions = questions.sort(() => 0.5 - Math.random());
let selectedQuestions = shuffledQuestions.slice(0, 3); //second is level
let questionsArr = selectedQuestions.map( (goal) => {
  return {
    id:goal.id,
    question:goal.question,
    suggestion:goal.suggestion
  }
}) 
  
console.log(answeredGoals(state.userGoals))
  //const bio = "Everybody has the power to remodel their behaviour, habits, and attitudes, but not everybody knows how. Our app will make it simple and rewarding for anybody to get the benefits of reflective journaling. Our app will bring people together through personal goals, challenges, and insights, so that we can realize our potential together."

  return (
    <main className="layout">
      <Navbar 
        users={ state.users }
        logUser={ loggedInUser }
        logoutUser={ loggedOutUser }
        user={ state.currentUser }
      />
      {state.currentUser && (
      <section className="feed">
        <hr/>
       
        <Bio 
          bio={"[YOUR BIO]: describe the person you want to be"}
          
          level={10}
          requestInsight={requestInsight}
          currentUserGoals={state.currentUserGoals}
          userInsight={state.currentUserInsight}
        />
        <hr/>
        <QuestionList 
          giveAnswer={ansQuestion}
          questions={questionsArr}
          setAnswer = {setAnswer}
          addUserGoal = {addUserGoal}
          goals = {state.goals}
          currentUserId={state.currentUser}
          answeredGoals={answeredGoals(state.userGoals)}
        />
        <hr />
        <div>
      <Wall userGoals={state.currentUserGoals} userId = {state.currentUser}/>
      </div>
      </section>
      )} 
      { state.currentUser === null && ( 
        <div>
          <LogoutPrompt />
        </div> 
      )}

     </main>
  );
}