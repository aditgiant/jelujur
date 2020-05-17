import React, { Component } from 'react';
import fire, {storage} from './Fire';
import { Link } from 'react-router-dom';

class AdminEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      image: '',
      imageBucket:'',
      description: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    const ref = fire.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          image: board.image,
          description: board.description
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
    console.log(this.state);
  }

  onImageChange = (e) => {
    const state = this.state
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

    const updateRef = fire.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      title,
      image,
      description
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        image: '',
        description: ''
      });
      this.props.history.push("/adminshow/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3><Link style={{'fontFamily':'Manrope'}}to={`/adminshow/${this.state.key}`}>&lt; Cancel</Link></h3>
            <br/>
            <h3 class="panel-title">
              Edit {this.state.title}
            </h3>
          </div>
          <div class="panel-body">
            
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                {this.state.image !== '' && <><img id="thumbnail" src={this.state.image}/><br/><br/></>}
                {this.state.image === '' && <label for="imageBucket">Upload new image:</label>}
                {this.state.image !== '' && <label for="imageBucket">Change image:</label>}
                <input type="file" class="form-control" name="imageBucket" onChange={this.onImageChange} />
                <button type="button" onClick={this.handleUpload}>Upload</button>
              </div>
              
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminEdit;