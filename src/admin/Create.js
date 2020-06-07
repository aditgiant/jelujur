import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fire, {storage} from './Fire';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = fire.firestore().collection('Products');
    this.state = {
      title: '',
      category:'',
      price:'',
      care:'',
      care2:'',
      care3:'',
      care4:'',
      sizeGuide:'',
      howToOrder:'',
      imageBucket: null,
      image:'',
      moreImageBucket: null,
      moreImage:'',
      description1: '',
      description2: '',
      material1: '',
      material2: '',
      material3: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleMoreUpload = this.handleMoreUpload.bind(this);
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

  handleMoreUpload = () => {
    const {moreImageBucket} = this.state;
    const uploadTask = storage.ref(`images/${moreImageBucket.name}`).put(moreImageBucket);
    uploadTask.on('state_changed',
    () => {
      // complete function ....
      console.log(this.state);
      storage.ref('images').child(moreImageBucket.name).getDownloadURL().then(moreImage => {
          this.setState({moreImage});
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

    const { title, category, price, care, care2, care3, care4, sizeGuide, howToOrder, image, moreImage, description1, description2, material1, material2, material3 } = this.state;

    this.ref.add({
      title,
      category,
      price,
      care,
      care2,
      care3,
      care4,
      sizeGuide,
      howToOrder,
      image,
      moreImage,
      description1,
      description2,
      material1,
      material2,
      material3,
    }).then((docRef) => {
      this.setState({
        title: '',
        category:'',
        price:'',
        care:'',
        care2:'',
        care3:'',
        care4:'',
        sizeGuide:'',
        howToOrder:'',
        imageBucket: null,
        image:'',
        moreImageBucket: null,
        moreImage: '',
        description1: '',
        description2: '',
        material1: '',
        material2: '',
        material3: '',
      });
      this.props.history.push("/admin/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, category, price, care, care2, care3, care4, sizeGuide, howToOrder, imageBucket, image, moreImageBucket, moreImage, description1, description2, material1, material2, material3  } = this.state;
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
              </div> <div class="form-group">
                <label for="category">Category:</label>
                <input type="text" class="form-control" name="category" value={category} onChange={this.onChange} placeholder="Category" />
              </div>
              <div class="form-group">
                {this.state.image === '' && <label for="imageBucket">Upload main image:</label>}
                {this.state.image !== '' && <label for="imageBucket">Change main image:</label>}
                <input type="file" class="form-control" name="imageBucket" onChange={this.onImageChange} />
                <button type="button" onClick={this.handleUpload}>Upload</button>
                {this.state.image !== '' && <><img id="thumbnail" src={this.state.image}/><br/><br/></>}
              </div>
              <div class="form-group">
                {this.state.image === '' && <label for="imageBucket">Upload more images:</label>}
                {this.state.image !== '' && <label for="imageBucket">Add more images:</label>}
                <input type="file" class="form-control" name="moreImageBucket" onChange={this.onImageChange} />
                <button type="button" onClick={this.handleMoreUpload}>Upload</button>
                {this.state.moreImage !== '' && <><img id="thumbnail" src={this.state.moreImage}/><br/><br/></>}
              </div>
              <div class="form-group">
                <label for="description 1">Description:</label>
                <input type="text" class="form-control" name="description1" value={description1} onChange={this.onChange} placeholder="Paragraph 1" />
              </div>
              <div class="form-group">
                <label for="description 2">More Description:</label>
                <input type="text" class="form-control" name="description2" value={description2} onChange={this.onChange} placeholder="Paragraph 2" />
              </div>
              <div class="form-group">
                <label for="material1">Material 1:</label>
                <input type="text" class="form-control" name="material1" value={material1} onChange={this.onChange} placeholder="Material 1" />
              </div>
              <div class="form-group">
                <label for="material2">Material 2:</label>
                <input type="text" class="form-control" name="material2" value={material2} onChange={this.onChange} placeholder="Material 2" />
              </div>
              <div class="form-group">
                <label for="material3">Material 3:</label>
                <input type="text" class="form-control" name="material3" value={material3} onChange={this.onChange} placeholder="Material 3" />
              </div>
              <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="care">Care 1:</label>
                <input type="text" class="form-control" name="care" value={care} onChange={this.onChange} placeholder="Care" />
              </div>
              <div class="form-group">
                <label for="care2">Care 2:</label>
                <input type="text" class="form-control" name="care2" value={care2} onChange={this.onChange} placeholder="Care 2" />
              </div>
              <div class="form-group">
                <label for="care3">Care 3:</label>
                <input type="text" class="form-control" name="care3" value={care3} onChange={this.onChange} placeholder="Care3" />
              </div>
              <div class="form-group">
                <label for="care4">Care 4:</label>
                <input type="text" class="form-control" name="care4" value={care4} onChange={this.onChange} placeholder="Care4" />
              </div>
              <div class="form-group">
                <label for="sizeGuide">Size Guide:</label>
                <input type="text" class="form-control" name="sizeGuide" value={sizeGuide} onChange={this.onChange} placeholder="Size Guide" />
              </div>
              <div class="form-group">
                <label for="howToOrder">How To Order:</label>
                <input type="text" class="form-control" name="howToOrder" value={howToOrder} onChange={this.onChange} placeholder="How To Order" />
              </div>
              <button onClick={this.onSubmit} type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;