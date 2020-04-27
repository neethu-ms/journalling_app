import React from "react";
import "./Profile.scss"
import { Container } from '@material-ui/core';

export default function UserBio(props) {
  return (
    <aside className="" id="">
      <Container>
        <section className="prompt__actions card_right">
          <h4 className="">Level: {props.level}</h4>
        </section>
      </Container>
    </aside>
  );
}