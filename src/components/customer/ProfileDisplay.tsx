import * as React from "react";
import { Button, Container } from "reactstrap";
import ProfileFetch from "./ProfileFetch";
import IProfile from "../interfaces/IProfile";
import Table from "react-bootstrap/Table";
import Profile from './Profile';

export interface ProfileDisplayProps {
  sessionToken: string;
  profile: IProfile;
}

export interface ProfileDisplayState {
  showModal: boolean;
}

class ProfileDisplay extends React.Component<ProfileDisplayProps, ProfileDisplayState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: true,
    };
  }

  toggle = () => {
    this.setState({ showModal: !this.state.showModal})
  }
  
  render() {
    console.log(this.props.profile);
    return (
      <div>
        <Container>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th style={{ width: "150px" }}>PROFILE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">First Name:</th>
                <td>{this.props.profile.first_name}</td>
              </tr>
              <tr>
                <th scope="row">Last Name:</th>
                <td>{this.props.profile.last_name}</td>
              </tr>
              <tr>
                <th scope="row">Address Line 1:</th>
                <td>{this.props.profile.address_1}</td>
              </tr>
              <tr>
                <th scope="row">Address Line: </th>
                <td>{this.props.profile.address_2}</td>
              </tr>
              <tr>
                <th scope="row">City:</th>
                <td>{this.props.profile.city}</td>
              </tr>
              <tr>
                <th scope="row">State:</th>
                <td>{this.props.profile.state}</td>
              </tr>
              <tr>
                <th scope="row">ZipCode:</th>
                <td>{this.props.profile.zipcode}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number:</th>
                <td>{this.props.profile.phone_number}</td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td>{<Button style={{ float: "right" }} >Update</Button>}</td>
              </tr>
            </tbody>
          </Table>
        </Container>

  {this.state.showModal == false ? <Profile sessionToken={this.props.sessionToken} toggle={this.toggle} /> : null}
  </div>
    );
  }
}

export default ProfileDisplay;
