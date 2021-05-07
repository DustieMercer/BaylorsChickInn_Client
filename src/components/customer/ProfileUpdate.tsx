import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Input,
} from "reactstrap";
import IProfile from "../interfaces/IProfile";

export interface ProfileUpdateFetchProps {
  sessionToken: string;
  toggle: Function;
  profile: IProfile;
}

export interface ProfileUpdateFetchState {
  first_name: string;
  last_name: string;
  email: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_number: string;
  modal: boolean;
}

class ProfileUpdate extends React.Component<
  ProfileUpdateFetchProps,
  ProfileUpdateFetchState
> {
  constructor(props: ProfileUpdateFetchProps) {
    super(props);
    this.state = {
      first_name: this.props.profile.first_name,
      last_name: this.props.profile.last_name,
      email: this.props.profile.email,
      address_1: this.props.profile.address_1,
      address_2: this.props.profile.address_2,
      city: this.props.profile.city,
      state: this.props.profile.state,
      zipcode: this.props.profile.zipcode,
      phone_number: this.props.profile.phone_number,
      modal: false,
    };
  }
  toggle = () => this.setState({ modal: !this.state.modal });

  updateProfileFetch = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/profile/`, {
      method: "PUT",
      body: JSON.stringify({
        profile: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          address_1: this.state.address_1,
          address_2: this.state.address_2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          phone_number: this.state.phone_number,
        },
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        }),
      }),
    })
      .then((response) => response.json())
      .then((json: any) => {
        console.log(json);
        this.props.toggle();
      });
  };

  render() {
    return (
      <div>
        <div>
          <Row>
            <Button
              style={{ justifyContent: "right", margin: "10px" }}
              color="primary"
              onClick={this.toggle}
            >
              Update Profile
            </Button>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Update Profile</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <Input
                      placeholder="First Name"
                      type="text"
                      value={this.state.first_name}
                      onChange={(event) =>
                        this.setState({ first_name: event.target.value })
                      }
                      autoComplete="given-name"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      value={this.state.last_name}
                      onChange={(event) =>
                        this.setState({ last_name: event.target.value })
                      }
                      autoComplete="family-name"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="Phone Number"
                      type="text"
                      value={this.state.phone_number}
                      onChange={(event) =>
                        this.setState({ phone_number: event.target.value })
                      }
                      autoComplete="tel-national"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="Address"
                      type="text"
                      value={this.state.address_1}
                      onChange={(event) =>
                        this.setState({ address_1: event.target.value })
                      }
                      autoComplete="address-line1"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="Suite/Apt#"
                      type="text"
                      value={this.state.address_2}
                      onChange={(event) =>
                        this.setState({ address_2: event.target.value })
                      }
                      autoComplete="address-line2"
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="City"
                      type="text"
                      value={this.state.city}
                      onChange={(event) =>
                        this.setState({ city: event.target.value })
                      }
                      autoComplete="address-level2"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="State"
                      type="text"
                      value={this.state.state}
                      onChange={(event) =>
                        this.setState({ state: event.target.value })
                      }
                      autoComplete="address-level1"
                      required
                    />
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col>
                    <Input
                      placeholder="Zipcode"
                      type="text"
                      value={this.state.zipcode}
                      onChange={(event) =>
                        this.setState({ zipcode: event.target.value })
                      }
                      autoComplete="postal-code"
                      required
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Input />
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateProfileFetch}>
                Submit
              </Button>
              <Button onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ProfileUpdate;
