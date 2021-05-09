import * as React from "react";
import APIURL from "../../helpers/environment";

import { Button, Container, Row } from "reactstrap";
import Table from "react-bootstrap/Table";

import ProfileCreate from "./ProfileCreate";
import DeleteProfile from "./DeleteProfile";
import ProfileUpdate from "./ProfileUpdate";
import IProfile from "../interfaces/IProfile";

export interface ProfileDisplayProps {
  sessionToken: string;
}

export interface ProfileDisplayState {
  showCreateModal: boolean;
  showUpdateModal: boolean;
  showDeleteModal: boolean;
  profile: IProfile;
}

class ProfileDisplay extends React.Component<
  ProfileDisplayProps,
  ProfileDisplayState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCreateModal: true,
      showUpdateModal: false,
      showDeleteModal: false,
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
  toggleCreate = () => {
    this.setState({ showCreateModal: !this.state.showCreateModal });
  };
  toggleUpdate = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  };
  toggleDelete = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
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
          this.setState({ profile: json });
          this.setState({ showCreateModal: false });
        }
      });
  };

  render() {
    return (
      <div>
        <Container>
          <Table striped bordered hover responsive="m">
            <thead>
              <tr>
                <th style={{ width: "25vw" }}>PROFILE</th>
                <td className="align-items-end" style={{ width: "75vw" }}></td>
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
                <td>
                  {this.state.showCreateModal == true ? (
                    <ProfileCreate
                      sessionToken={this.props.sessionToken}
                      toggleCreate={this.toggleCreate}
                      showCreateModal={this.state.showCreateModal}
                      fetchProfile={this.fetchProfile}
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <Button
                    color="primary"
                    align="right"
                    onClick={this.toggleUpdate}
                  >
                    Update
                  </Button>
                  {this.state.showUpdateModal ? (
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
                      toggleUpdate={this.toggleUpdate}
                      sessionToken={this.props.sessionToken}
                      fetchProfile={this.fetchProfile}
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button style={{ color: "" }} onClick={this.toggleDelete}>
            Delete
          </Button>
        </Container>
        {this.state.showDeleteModal ? (
          <DeleteProfile
            sessionToken={this.props.sessionToken}
            first_name={this.state.profile.first_name}
            id={this.state.profile.id}
            toggleDelete={this.toggleDelete}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ProfileDisplay;
