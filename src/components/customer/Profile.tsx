import { Component } from 'react';
export interface ProfileProps {
    role: string;
    sessionToken: string;
  }
  
  export interface ProfileState {
    sessionToken: string;
    role: string;
  }

class Profile extends Component<ProfileProps, ProfileState> {
    constructor (props:any) {
        super(props);
        this.state = {
            sessionToken:'',
            role: '',

        }
    }

    render() {
        return (
            <main>Your Awesome Profile Here</main>
        )
    }
}
export default Profile;