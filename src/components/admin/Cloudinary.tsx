import * as React from "react";
import AddChick from './AddChick';

export interface CloudinaryProps {
    sessionToken: string;
}

export interface CloudinaryState {
    image: string;
    loading: boolean;
}

class Cloudinary extends React.Component<CloudinaryProps, CloudinaryState> {
  constructor(props: CloudinaryProps) {
    super(props);
    this.state = {
        image: "",
        loading: false,
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
    const file = await res.json()
    this.setState({image: file.secure_url})
    this.setState({loading: false})
  };

  render() {
    return (

        <div className="cloudinary">
        <input
          type="file"
          name="file"
          placeholder="UploadImage"
          onChange={(e) => {this.uploadImage(e)}}
        />
        {this.state.loading ? (
            <h3>Loading...</h3>
        ): (
            <img src={this.state.image} style={{width: '300px'}}/>
        )}
     
      </div>
    );
  }
}

export default Cloudinary;
