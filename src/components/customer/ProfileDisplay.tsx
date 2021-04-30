import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import Profile from './Profile'
import { Button, Table } from "reactstrap";
import ProfileFetch from './ProfileFetch';
import IProfile from '../interfaces/IProfile';

export interface ProfileDisplayProps {
    sessionToken: string;
    profile:IProfile;
}
 
export interface ProfileDisplayState {
    
}
 
class ProfileDisplay extends React.Component<ProfileDisplayProps, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
          };
    }        
    render() { 
      console.log(this.props.profile)
        return ( 
            <div>

<Table>
      <thead>
        <tr>
          <th></th>
          <th>Profile</th>
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
      </tbody>
    </Table>
            </div>
         );
    }
}
 
export default ProfileDisplay;