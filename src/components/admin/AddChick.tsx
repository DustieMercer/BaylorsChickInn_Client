import { Component } from "react";
import APIURL from "../../helpers/environment";
import * as React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Input,
} from "reactstrap";
import IChick from "../interfaces/IChick";

export interface AddChickProps {
  sessionToken: string;
  toggleCreate: Function;
  showCreateModal:boolean;
}

export interface AddChickState {
  loading: boolean;
  image: string;
  chick_name: string;
  chick_type: string;
  chick_production: string;
  chick_persona: string;
  photo: string;
}

class AddChick extends React.Component<AddChickProps, AddChickState> {
  constructor(props: AddChickProps) {
    super(props);
    this.state = {
      image: "",
      loading: false,
      chick_name: "",
      chick_type: "",
      chick_production: "",
      chick_persona: "",
      photo: "",
    };
  }

  uploadImage = async (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "dustie");
    this.setState({ loading: true });
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/baylorschickinn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    this.setState({ image: file.secure_url });
    this.setState({ loading: false });
  };

  handleClick = (event: any) => {
    event.preventDefault();
    const token = this.props.sessionToken
      ? this.props.sessionToken
      : localStorage.getItem("sessionToken");
    debugger;
    fetch(`${APIURL}/chick/hatched`, {
      method: "POST",
      body: JSON.stringify({
        chick: {
          chick_name: this.state.chick_name,
          chick_type: this.state.chick_type,
          chick_production: this.state.chick_production,
          chick_persona: this.state.chick_persona,
          photo: this.state.image,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      }),
    })
      .then((response) => response.json())
      .then((json: IChick) => {
        let chick = json;
        console.log(chick);
        this.props.toggleCreate();
      });
  };

  render() {
    return (
      <div>
        <Row></Row>
        <Modal isOpen={true}>
          <ModalHeader>Add New Chick</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <Input
                    placeholder="Chick Name"
                    type="text"
                    value={this.state.chick_name}
                    onChange={(event) =>
                      this.setState({ chick_name: event.target.value })
                    }
                    required
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Chick Type"
                    type="text"
                    value={this.state.chick_type}
                    onChange={(event) =>
                      this.setState({ chick_type: event.target.value })
                    }
                    required
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Annual Egg Production"
                    type="text"
                    value={this.state.chick_production}
                    onChange={(event) =>
                      this.setState({ chick_production: event.target.value })
                    }
                    required
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Input
                    placeholder="Chick Persona"
                    type="text"
                    value={this.state.chick_persona}
                    onChange={(event) =>
                      this.setState({ chick_persona: event.target.value })
                    }
                    required
                  />
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  {this.state.loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <img src={this.state.image} style={{ width: "300px" }} />
                  )}
                  <input
                    type="file"
                    name="file"
                    placeholder="UploadImage"
                    onChange={(e) => {
                      this.uploadImage(e);
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>
              Save
            </Button>{" "}
            <Button
              color="secondary"
              onClick={(event) => this.props.toggleCreate()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddChick;
