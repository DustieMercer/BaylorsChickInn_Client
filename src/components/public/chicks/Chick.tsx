import APIURL from "../../../helpers/environment";
import * as React from "react";
import IChick from '../../interfaces/IChick';
import ChickDisplay from "./ChickDisplay";

export interface ChickProps {
  sessionToken: string;
}

export interface ChickState {
  chick: IChick;
}

class Chick extends React.Component<
  ChickProps,
  ChickState
> {
  constructor(props: ChickProps) {
    super(props);
    this.state = {
      chick: {
        chick_name: "",
        chick_type: "",
        chick_production: "",
        chick_persona: "",
        photo: '../../assets/chickenIcon_blue.png',
        id: NaN,
      }
    };
  }
componentDidMount = () => {
  this.fetchChick();
}

  fetchChick = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: any) => {
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

export default Chick;
