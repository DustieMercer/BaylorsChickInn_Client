import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import ProfileDisplay from './ProfileDisplay';
import { Button, Table } from "reactstrap";
import IProfile from '../interfaces/IProfile';
import Profile from './Profile';

export interface ProfileFetchProps {
  sessionToken: string;
}

export interface ProfileFetchState {
  profile: IProfile;
}

class ProfileFetch extends React.Component<
  ProfileFetchProps,
  ProfileFetchState
> {
  constructor(props: ProfileFetchProps) {
    super(props);
    this.state = {
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
componentDidMount = () => {
  this.fetchProfile();
}

  fetchProfile = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/profile/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IProfile) => {
        if (json !== null) {
          this.setState({profile: json})
        }         
      });
      
  };
  render() {
    return (
      <div>
   
        <ProfileDisplay
          profile={this.state.profile}
          sessionToken={this.props.sessionToken}
        />
     

      </div>
    );
  }
}

export default ProfileFetch;
