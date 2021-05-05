import * as React from "react";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';
import Chick from "./Chick";
import IChick from '../../interfaces/IChick';
import chickenIcon_blue from '../../assets/chickenIcon_blue.png';

export interface ChickDisplayProps {
  sessionToken: string;
  chick: IChick;
}

export interface ChickDisplayState {
}

class ChickDisplay extends React.Component<ChickDisplayProps, any> {
  constructor(props: any) {
      super(props);
      this.state = { 
        };
  }  
  render() {
    console.log(this.props.chick)
    return (
      <main>
        <CardGroup>
      <Card>
        <CardImg top width="100%" src={chickenIcon_blue} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{this.props.chick.chick_name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.chick.chick_type}</CardSubtitle>
          <CardText>
            <p>Annual Egg Production:{this.props.chick.chick_production}</p>
            <p>Fun Fact:{this.props.chick.chick_persona}</p>
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </CardGroup>
      </main>
    );
  }
}
export default ChickDisplay;
