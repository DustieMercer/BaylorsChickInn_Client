import * as React from "react";
import { Button, Container } from "reactstrap";
import IProfile from "../interfaces/IProfile";
import Table from "react-bootstrap/Table";
import ProfileUpdate from "./ProfileUpdate";
import APIURL from "../../helpers/environment";
import ProfileCreate from './ProfileCreate';

export interface ProfileDisplayProps {
  sessionToken: string;
}

export interface ProfileDisplayState {
  showModal: boolean;
  profile: IProfile;
  needProfile:boolean;
}

class ProfileDisplay extends React.Component<
  ProfileDisplayProps,
  ProfileDisplayState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      needProfile:true,
      profile: {
        first_name: "",
        last_name: "",
        email: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        zipcode: "",
        phone_number: "",
        id: NaN,
      },
    };
  }
  toggle = (event: any) => {
    this.setState({ showModal: !this.state.showModal });
  };

  componentDidMount = () => {
    this.fetchProfile();
  };

  fetchProfile = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/profile/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IProfile) => {
        if (json !== null) {
          this.setState({ profile: json })
          this.setState({needProfile: false});
        }
      });
  };

  render() {
    console.log(this.state.profile);
    return (
      <div>
        {this.state.needProfile === true ? <ProfileCreate sessionToken={this.props.sessionToken}/> : ''}
        <Container>
          <Table striped bordered hover responsive='m'>
            <thead>
              <tr>
                <th style={{ width: "150px" }}>PROFILE</th>
                <td className="align-items-end">
                  <ProfileUpdate
                    profile={this.state.profile}
                    sessionToken={this.props.sessionToken}
                    toggle={this.toggle}
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">First Name:</th>
                <td>{this.state.profile.first_name}</td>
              </tr>
              <tr>
                <th scope="row">Last Name:</th>
                <td>{this.state.profile.last_name}</td>
              </tr>
              <tr>
                <th scope="row">Address Line 1:</th>
                <td>{this.state.profile.address_1}</td>
              </tr>
              <tr>
                <th scope="row">Address Line: </th>
                <td>{this.state.profile.address_2}</td>
              </tr>
              <tr>
                <th scope="row">City:</th>
                <td>{this.state.profile.city}</td>
              </tr>
              <tr>
                <th scope="row">State:</th>
                <td>{this.state.profile.state}</td>
              </tr>
              <tr>
                <th scope="row">ZipCode:</th>
                <td>{this.state.profile.zipcode}</td>
              </tr>
              <tr>
                <th scope="row">Phone Number:</th>
                <td>{this.state.profile.phone_number}</td>
              </tr>
            </tbody>
            <Button color="danger" style={{ float: "right" }}>
            Delete User
          </Button>
          </Table>
          
        </Container>

        {/* {this.state.showModal == true ? (
          <ProfileUpdate
            profile={this.state.profile}
            sessionToken={this.props.sessionToken}
            toggle={this.toggle}
          />
        ) : null} */}
      </div>
    );
  }
}

export default ProfileDisplay;
