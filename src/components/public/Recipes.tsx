import * as React from "react";
import { Component } from "react";


class Recipes extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      recipe: "",
    };
  }


  render() {
    return (
      <main>
        <p> Eggs, and Eggs, and Eggs.</p>
      </main>
    );
  }
}

export default Recipes;
