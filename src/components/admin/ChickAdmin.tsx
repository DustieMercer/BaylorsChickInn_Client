import APIURL from "../../helpers/environment";
import * as React from "react";
import AddChick from "./AddChick";
import IChick from "../interfaces/IChick";
import DeleteChick from "./DeleteChick";

import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import ChickMapper from "./ChickMapper";

export interface ChickAdminProps {
  sessionToken: string;
}

export interface ChickAdminState {
  chicks: [];
  chick_name: string;
  chick_type: string;
  chick_production: string;
  chick_persona: string;
  photo: string;
}

class ChickAdmin extends React.Component<ChickAdminProps, ChickAdminState> {
  constructor(props: ChickAdminProps) {
    super(props);
    this.state = {
      chicks: [],
      chick_name: "",
      chick_type: "",
      chick_production: "",
      chick_persona: "",
      photo: "",
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
      .then((json: []) => {
        this.setState({ chicks: json });
        console.log(this.state.chicks);
      });
  };

  render() {
    
    return (
      <div>
        <AddChick sessionToken={this.props.sessionToken} />


        {this.state.chicks.map((chick:{
chick_name: string, chick_type: string, chick_production: string, chick_persona: string,
photo: string}, index) => {
          return (
            <CardDeck>
            <Card>
            <CardImg
              top
              width="25%"
              src={chick.photo}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle tag="h5">Name:{chick.chick_name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Breed:{this.state.chick_type}
              </CardSubtitle>
              <CardText>
                Annual Egg Production:{chick.chick_production}
              </CardText>
              <CardText>Fun Fact:{chick.chick_persona}</CardText>
            </CardBody>
          </Card>
          </CardDeck>
          )
          
        })}
        <DeleteChick
          sessionToken={this.props.sessionToken}
          fetchChicks={this.fetchChicks}
        />
      </div>
    );
  }
}

export default ChickAdmin;
