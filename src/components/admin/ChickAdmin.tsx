import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import AddChick from "./AddChick";
import IChick from "../interfaces/IChick";
import DeleteChick from "./DeleteChick";
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody
} from 'reactstrap';

export interface ChickAdminProps {
  sessionToken: string;
}

export interface ChickAdminState {
  chicks: [];
  chick: {
    chick_name: string;
    chick_type: string;
    chick_production: string;
    chick_persona: string;
    photo: string;
  };
}

class ChickAdmin extends React.Component<ChickAdminProps, ChickAdminState> {
  constructor(props: ChickAdminProps) {
    super(props);
    this.state = {
      chicks: [],
      chick: {
        chick_name: "",
        chick_type: "",
        chick_production: "",
        chick_persona: "",
        photo: "",
      },
    };
  }

  componentDidMount = () => {
    this.fetchChicks();
  };
  fetchChicks = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IChick) => {
        let chicks = json;
        console.log(chicks);
      });
  };

  render() {
    return (
      <div>
        {this.state.chicks.map((chick) => (
          <Card>
          <CardImg top width="100%" src={this.state.chick.photo} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h5">Name:{this.state.chick.chick_name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Breed:{this.state.chick.chick_type}</CardSubtitle>
            <CardText>Annual Egg Production:{this.state.chick.chick_production}</CardText>
            <CardText>Fun Fact:{this.state.chick.chick_persona}</CardText>
            {/* <DeleteChick
          sessionToken={this.props.sessionToken}
          fetchChicks={this.fetchChicks}
        /> */}
          </CardBody>
        </Card>
        ))}

        <AddChick sessionToken={this.props.sessionToken} />
        
      </div>
    );
  }
}

export default ChickAdmin;
