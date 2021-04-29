import { Component } from 'react';
import * as React from "react";

export interface ChickAdminProps {
    sessionToken: string;
}
 
export interface ChickAdminState {
    
}
 
class ChickAdmin extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { 
             };
    }
    render() { 
        return ( 
            <div>
                ChickAdmin
            </div>
         );
    }
}
 
export default ChickAdmin;