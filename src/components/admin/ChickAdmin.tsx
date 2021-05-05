import { Component } from "react";
import APIURL from '../../helpers/environment';
import * as React from "react";

import { Button, Table } from "reactstrap";
import IChick from '../interfaces/IChick';
import ChickDisplay from "../public/chicks/ChickDisplay";

export interface ChickAdminProps {
  sessionToken: string;
  
}

export interface ChickAdminState {
  chick: IChick;
}

class ChickAdmin extends React.Component<
  ChickAdminProps,
  ChickAdminState
> {
  constructor(props: ChickAdminProps) {
    super(props);
    this.state = {
      chick: {
        chick_name: "",
        chick_type: "",
        chick_production: "",
        chick_persona: "",
        photo: "",
        id: NaN
      }
    };
  }

  fetchChickUpdate = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/${this.state.chick.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IChick) => {
        this.setState({chick: json})
      });
  };
  render() {
      console.log(this.state.chick)
    return (
      <div>
     <ChickDisplay
          chick={this.state.chick}
          sessionToken={this.props.sessionToken}
        />
      </div>
    );
  }
}

export default ChickAdmin;
