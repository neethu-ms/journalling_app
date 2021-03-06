import React from "react";

import Profile from './Profile';
import UserBio from './UserBio';
import Error from './Error';
import Insights from './Insights';
import Status from './Loading';
import useVisualMode from "../../hooks/useVisualMode";
import {Container} from '@material-ui/core';
import "../../styles/Bio.scss";


  export default function Bio(props) {

    const USERBIO = "USERBIO";
    const INSIGHTS = "INSIGHTS";
    const LOADING = "LOADING";
    const DENIED = "DENIED";
    const ERROR = "ERROR";
    const { mode, transition, back } = useVisualMode(USERBIO);

    const loadInsight = () => {
             props.requestInsight(props.currentUserGoals)
        .then(()=> {
          transition(INSIGHTS)
        })
        .catch(error => transition(ERROR))
    }
    
    return(

    <main>
      <Container className="bioContainer">
    <section>
      <Profile 
      bio = {props.bio}
      level={props.level}
      />
    </section>

    <section>

    {mode === USERBIO && (
      <UserBio 
      level={props.level}
        bio={props.bio}
        onClick={()=>  {
          if (props.level > 9) {
          transition(LOADING)
          loadInsight()
        } else {
          transition(DENIED)
        }
        }} 

      />
    )}

    {mode === DENIED && (
      <Error 
        message={"Reach level 10 to access your insights!"}
        onCancel={back}
      />
    )}

    {mode === ERROR && (
      <Error 
        message={"Unable to load insights! Make sure you are providing enough data for an analysis by writing complete sentences!"}
        onCancel={back}
      />
    )}

    {mode === LOADING && (
      <Status 
        message={"Loading insights!"}
        onCancel={back}
      />
    )}

    {mode === INSIGHTS && (
      <Insights 
        insights={props.userInsight}
        onCancel={()=>{transition(USERBIO)}}
      />
    )}
    
    </section>
    </Container>
    </main>
    )
  }