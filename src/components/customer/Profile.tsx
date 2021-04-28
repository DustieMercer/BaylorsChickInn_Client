import { Component } from "react";
import IProfile from "../interfaces/IProfile";
import APIURL from "../../helpers/environment";
import { Form, Input, Button, Row, Col } from "reactstrap";

export interface ProfileProps {
  sessionToken: string;
}

export interface ProfileState {
  sessionToken: string;
  first_name: string;
  last_name: string;
  email: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  phone_number: string;
}

class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: "",
      first_name: "",
      last_name: "",
      email: "",
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
    fetch(`${APIURL}/order/create`, {
      method: "POST",
      body: JSON.stringify({
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
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json: IProfile) => {
        console.log(json);
      });
  };

  render() {
    return (
      <main>
        <Form>
          <Input placeholder="First Name"></Input>
          <Input placeholder="Last Name"></Input>
          <Input placeholder="Email"></Input>
          <Input placeholder="Address"></Input>
          <Input placeholder="Suite/Apt#"></Input>
          <Input placeholder="City"></Input>
          <Input placeholder="State"></Input>
          <Input placeholder="Zipcode"></Input>
        </Form>
      </main>
    );
  }
}
export default Profile;
