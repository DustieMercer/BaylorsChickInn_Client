import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import ProfileDisplay from "./ProfileDisplay";
import {
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import IProfile from "../interfaces/IProfile";

export interface ProfileUpdateFetchProps {
  first_name: string;
  last_name: string;
  email: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_number: string;
  fetchProfile: Function;
  sessionToken: string;
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
  showModal: boolean;
}

class ProfileUpdate extends React.Component<
  ProfileUpdateFetchProps,
  ProfileUpdateFetchState
> {
  constructor(props: ProfileUpdateFetchProps) {
    super(props);
    this.state = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      address_1: this.props.address_1,
      address_2: this.props.address_2,
      city: this.props.city,
      state: this.props.state,
      zipcode: this.props.zipcode,
      phone_number: this.props.phone_number,
      showModal: false,
    };
  }

  toggle = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  updateProfile = (event: any) => {
    event.preventDefault();
    let token = this.props.sessionToken ? this.props.sessionToken : localStorage.getItem('sessionToken')
    fetch(`${APIURL}/profile/`, {
      method: "PUT",
      body: JSON.stringify({
        profile: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          address_1: this.state.address_1,
          address_2: this.state.address_2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          phone_number: this.state.phone_number,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : '',
      }),
    })
      .then((res) => res.json())
      .then((json: IProfile) => {
        console.log(json);
        this.toggle();
        this.props.fetchProfile();
      });
  };

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Update
        </Button>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Personal Profile</ModalHeader>
          <ModalBody>
            <Form>
              <br />
              <Input
                placeholder="First Name"
                type="text"
                value={this.state.first_name}
                onChange={(event) =>
                  this.setState({ first_name: event.target.value })
                }
                autoComplete="given-name"
                required
              ></Input>
              <br />
              <Input
                placeholder="Last Name"
                type="text"
                value={this.state.last_name}
                onChange={(event) =>
                  this.setState({ last_name: event.target.value })
                }
                autoComplete="family-name"
                required
              ></Input>
              <br />
              <Input
                placeholder="Phone Number"
                type="text"
                value={this.state.phone_number}
                onChange={(event) =>
                  this.setState({ phone_number: event.target.value })
                }
                autoComplete="tel-national"
                required
              ></Input>
              <br />
              <Input
                placeholder="Address"
                type="text"
                value={this.state.address_1}
                onChange={(event) =>
                  this.setState({ address_1: event.target.value })
                }
                autoComplete="address-line1"
                required
              ></Input>
              <br />
              <Input
                placeholder="Suite/Apt#"
                type="text"
                value={this.state.address_2}
                onChange={(event) =>
                  this.setState({ address_2: event.target.value })
                }
                autoComplete="address-line2"
              ></Input>
              <br />
              <Input
                placeholder="City"
                type="text"
                value={this.state.city}
                onChange={(event) =>
                  this.setState({ city: event.target.value })
                }
                autoComplete="address-level2"
                required
              ></Input>
              <br />
              <Input
                placeholder="State"
                type="text"
                value={this.state.state}
                onChange={(event) =>
                  this.setState({ state: event.target.value })
                }
                autoComplete="address-level1"
                required
              ></Input>
              <br />
              <Input
                placeholder="Zipcode"
                type="text"
                value={this.state.zipcode}
                onChange={(event) =>
                  this.setState({ zipcode: event.target.value })
                }
                autoComplete="postal-code"
                required
              ></Input>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateProfile}>
              Submit
            </Button>
            <Button onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProfileUpdate;
