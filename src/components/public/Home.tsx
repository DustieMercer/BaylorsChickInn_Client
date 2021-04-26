import * as React from "react";
import { Component } from "react";
import { Container, Row, Col, Jumbotron, Button, Media } from "reactstrap";
import baylor from "../assets/baylor.jpg";

export interface HomeProps {
  className: string;
}

export interface HomeState {}

class Home extends Component {
  render() {
    return (
      <main>
        <Jumbotron>
          <h1 className="display-3">Baylor's Chick Inn</h1>
          <h4>“We believe chickens who have fun make better eggs.”</h4>
        </Jumbotron>
        <Container>
          <Row>
            <Media>
              <Media left href="#">
                <img
                  src={baylor}
                  className="home-headshot"
                  alt="Baylor Headshot"
                />
              </Media>

              <Media body>
                <Media heading>Media heading</Media>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Media>
            </Media>
          </Row>
        </Container>
      </main>
    );
  }
}

export default Home;
