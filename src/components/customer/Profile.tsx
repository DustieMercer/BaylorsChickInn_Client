import { Component } from "react";
import APIURL from "../../helpers/environment";
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

export interface ProfileProps {
  sessionToken: string;
  toggle: Function;
}

export interface ProfileState {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_number: string;
}

class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      phone_number: "",
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/profile/new`, {
      method: "POST",
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
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IProfile) => {
        console.log(json);
        this.props.toggle(event);
      });
  };

  render() {
    return (
      <div>
        <Button
          color="danger"
          onClick={(event) => this.props.toggle(event)}
        ></Button>
        <Modal isOpen={true} >
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
            <Button onClick={this.handleSubmit}>Submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Profile;
