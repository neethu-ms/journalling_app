import React from "react";
import "./Profile.scss"
import { Container } from '@material-ui/core';

export default function UserBio(props) {
  return (
    <aside>
      <Container>
        <h4>Level: {props.level}</h4>
        <p>{props.bio}</p>
      </Container>
    </aside>
  );
}