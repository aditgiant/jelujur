import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire, {storage} from './Fire';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = fire.firestore().collection('boards');
    this.state = {
      title: '',
      imageBucket: null,
      image:'',
      description: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state);
  }

  onImageChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.files[0];
    this.setState(state);
    console.log(this.state);
  }

  handleUpload = () => {
    const {imageBucket} = this.state;
    const uploadTask = storage.ref(`images/${imageBucket.name}`).put(imageBucket);
    uploadTask.on('state_changed',
    () => {
      // complete function ....
      console.log(this.state);
      storage.ref('images').child(imageBucket.name).getDownloadURL().then(image => {
          this.setState({image});
          console.log(this.state);
      })},
    (error) => {
      // error function ....
      console.log(error);
    }, 
    )
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, image, description } = this.state;

    this.ref.add({
      title,
      image,
      description
    }).then((docRef) => {
      this.setState({
        title: '',
        image: '',
        description: ''
      });
      this.props.history.push("/admin")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, imageBucket, image, description } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3><Link style={{'fontFamily':'Manrope'}}to={'/admin'}>&lt; Cancel</Link></h3>
            <br/>
            <h3 class="panel-title">
              Add {this.state.title}
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                {this.state.image === '' && <label for="imageBucket">Upload new image:</label>}
                {this.state.image !== '' && <label for="imageBucket">Change image:</label>}
                <input type="file" class="form-control" name="imageBucket" onChange={this.onImageChange} />
                <button type="button" onClick={this.handleUpload}>Upload</button>
              </div>
              {this.state.image !== '' && <><img id="thumbnail" src={this.state.image}/><br/><br/></>}
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" />
              </div>
              <button onClick={this.handleUpload} type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;