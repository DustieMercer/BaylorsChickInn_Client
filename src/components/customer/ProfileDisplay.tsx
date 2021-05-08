import * as React from "react";
import { Button, Container, Row } from "reactstrap";
import IProfile from "../interfaces/IProfile";
import Table from "react-bootstrap/Table";
import ProfileUpdate from "./ProfileUpdate";
import APIURL from "../../helpers/environment";
import DeleteProfile from "./DeleteProfile";

export interface ProfileDisplayProps {
  sessionToken: string;
}

export interface ProfileDisplayState {
  showModal: boolean;
  needProfile: boolean;
  profile: IProfile;
}

class ProfileDisplay extends React.Component<
  ProfileDisplayProps,
  ProfileDisplayState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      needProfile: true,
      profile:{
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
      }
    };
  }
  toggle = () => {
    this.setState({ showModal: !this.state.showModal });
    this.fetchProfile();
  };

  componentDidMount = () => {
    this.fetchProfile();
    console.log(this.props.sessionToken);
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
          this.setState({ profile: json });
          this.setState({ needProfile: false });
        }
      });
  };

  render() {
    console.log(this.state.profile);
    return (
      <div> 
        <Container>
          <Table striped bordered hover responsive="m">
            <thead>
              <tr>
                <th style={{ width: "150px" }}>PROFILE</th>
                <td className="align-items-end"></td>
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
              <tr>
                <th></th>
                <td></td>
                <td>
                  
             <ProfileUpdate
                      first_name={this.state.profile.first_name}
                      last_name={this.state.profile.last_name}
                      email={this.state.profile.email}
                      address_1={this.state.profile.address_1}
                      address_2={this.state.profile.address_2}
                      city={this.state.profile.city}
                      state={this.state.profile.state}
                      zipcode={this.state.profile.zipcode}
                      phone_number={this.state.profile.phone_number}
                      fetchProfile={this.fetchProfile}
                      sessionToken={this.props.sessionToken}
                    /> 
</td>
<td>
                    <DeleteProfile
                      sessionToken={this.props.sessionToken}
                      first_name={this.state.profile.first_name}
                      id={this.state.profile.id}
                    />
          
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ProfileDisplay;
