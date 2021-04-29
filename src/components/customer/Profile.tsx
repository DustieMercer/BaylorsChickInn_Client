import { Component } from "react";
import APIURL from "../../helpers/environment";
import { Form, Input, Button, Row, Col } from "reactstrap";

export interface ProfileProps {
  sessionToken: string;
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
    const token = this.props.sessionToken ? this.props.sessionToken : localStorage.getItem('sessionToken') 
    fetch(`${APIURL}/profile/new`, {
      method: "POST",
      body: JSON.stringify({
        profile: {
          first_name: "",
          last_name: "",
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
        "Authorization": token ? token : '',
        
      }),
    })
      .then((response) => response.json())
      .then((json: ProfileProps) => {
        console.log(json);
      });
  };

  render() {
    return (
      <main>
        <Form>
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

          <Input
            placeholder="Suite/Apt#"
            type="text"
            value={this.state.address_2}
            onChange={(event) =>
              this.setState({ address_2: event.target.value })
            }
            autoComplete="address-line2"
          ></Input>
          <Input
            placeholder="City"
            type="text"
            value={this.state.city}
            onChange={(event) => this.setState({ city: event.target.value })}
            autoComplete="address-level2"
            required
          ></Input>

          <Input
            placeholder="State"
            type="text"
            value={this.state.state}
            onChange={(event) => this.setState({ state: event.target.value })}
            autoComplete="address-level1"
            required
          ></Input>

          <Input
            placeholder="Zipcode"
            type="text"
            value={this.state.zipcode}
            onChange={(event) => this.setState({ zipcode: event.target.value })}
            autoComplete="postal-code"
            required
          ></Input>

          <Button onClick={this.handleSubmit}>Create Profile</Button>



        </Form>
      </main>
    );
  }
}
export default Profile;
