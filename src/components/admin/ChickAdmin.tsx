import APIURL from "../../helpers/environment";
import * as React from "react";
import AddChick from "./AddChick";
import IChick from "../interfaces/IChick";
import DeleteChick from "./DeleteChick";
import UpdateChick from "./UpdateChick";
import { Card, Button, CardImg } from "react-bootstrap";

export interface ChickAdminProps {
  sessionToken: string;
}

export interface ChickAdminState {
  chicks: [];
  chick_name: string;
  chick_type: string;
  chick_production: string;
  chick_persona: string;
  photo: string;
  id: number;
  
  showCreateModal: boolean;
  showUpdateModal: boolean;
  showDeleteModal: boolean;
}

class ChickAdmin extends React.Component<ChickAdminProps, ChickAdminState> {
  constructor(props: ChickAdminProps) {
    super(props);
    this.state = {
      chicks: [],
      chick_name: "",
      chick_type: "",
      chick_production: "",
      chick_persona: "",
      photo: "",
      id: NaN,
      showCreateModal: false,
      showUpdateModal: false,
      showDeleteModal: false,
    };
  }

  toggleCreate = () => {
    this.setState({ showCreateModal: !this.state.showCreateModal });
  };
  setChickUpdate = (chick: IChick) => {
    this.setState({
      chick_name: chick.chick_name,
      chick_type: chick.chick_type,
      chick_production: chick.chick_production,
      chick_persona: chick.chick_persona,
      photo: chick.photo,
      id: chick.id,
    });
    this.toggleUpdate();
  };

  setChickDelete = (chick: IChick) => {
    this.setState({
      chick_name: chick.chick_name,
      chick_type: chick.chick_type,
      chick_production: chick.chick_production,
      chick_persona: chick.chick_persona,
      photo: chick.photo,
      id: chick.id,
    });
    this.toggleDelete();
  };

  toggleUpdate = () => {
    this.setState({ showUpdateModal: !this.state.showUpdateModal });
  };
  toggleDelete = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  componentDidMount = () => {
    this.fetchChicks();
  };
  fetchChicks = () => {
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    fetch(`${APIURL}/chick/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: []) => {
        this.setState({ chicks: json });
      });
  };

  render() {
    return (
      <div>
       {this.state.chicks.map(
          (
            chick: {
              chick_name: string;
              chick_type: string;
              chick_production: string;
              chick_persona: string;
              photo: string;
              id: number;
            },
            index
          ) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={chick.photo} />
                <Card.Body>
                  <Card.Title>{chick.chick_name}</Card.Title>
                  <Card.Text>{chick.chick_type}</Card.Text>
                  <Card.Text>
                    Annual Egg Production:{" "}
                    <strong>{chick.chick_production}</strong>
                  </Card.Text>
                  <Card.Text>{chick.chick_persona}</Card.Text>
                  <Button
                    style={{ justifyContent: "right", margin: "10px" }}
                    color="primary"
                    onClick={(e) => this.setChickUpdate(chick)}
                  >
                    Update Chick
                  </Button>

                  <Button
                    color="danger"
                    onClick={(event) => this.setChickDelete(chick)}
                    style={{ margin: "10px" }}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          }
        )}

        {this.state.showUpdateModal == true ? (
          <UpdateChick
            sessionToken={this.props.sessionToken}
            fetchChicks={this.fetchChicks}
            chick_name={this.state.chick_name}
            chick_type={this.state.chick_type}
            chick_production={this.state.chick_production}
            chick_persona={this.state.chick_persona}
            photo={this.state.photo}
            id={this.state.id}
            toggleUpdate={this.toggleUpdate}
          />
        ) : (
          ""
        )}
        {this.state.showDeleteModal == true ? (
          <DeleteChick
            sessionToken={this.props.sessionToken}
            fetchChicks={this.fetchChicks}
            id={this.state.id}
            chick_name={this.state.chick_name}
            toggleDelete={this.toggleDelete}
          />
        ) : (
          ""
        )}

<Button
          style={{ justifyContent: "right", margin: "10px" }}
          color="primary"
          onClick={this.toggleCreate}
        >
          Add Chick
        </Button>
        {this.state.showCreateModal == true ? (
          <AddChick
            sessionToken={this.props.sessionToken}
            toggleCreate={this.toggleCreate}
            showCreateModal={this.state.showCreateModal}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ChickAdmin;
