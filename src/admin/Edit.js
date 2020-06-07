import React, { Component } from 'react';
import fire, {storage} from './Fire';
import { Link } from 'react-router-dom';

class AdminEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      category:'',
      price:'',
      care:'',
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
    this.onImageRemove = this.onImageRemove.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleMoreUpload = this.handleMoreUpload.bind(this);
  }

  componentDidMount() {
    const ref = fire.firestore().collection('Products').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          category: board.category,
          price:board.price,
          care:board.care,
          care2:board.care2,
          care3:board.care3,
          care4:board.care4,
          sizeGuide:board.sizeGuide,
          howToOrder:board.howToOrder,
          image: board.image,
          moreImage: board.moreImage,
          description1: board.description1,
          description2: board.description2,
          material1: board.material1,
          material2: board.material2,
          material3: board.material3,
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

  onImageRemove = (e) => {
    const state = this.state
    state[e.target.name] = '';
    this.setState(state);
    console.log(e.target.name);
  }

  handleUpload = () => {
    const {imageBucket} = this.state;
    const uploadTask = storage.ref(`images/${imageBucket.name}`).put(imageBucket);
    uploadTask.on('state_changed',
    () => {
      // complete function ....
      storage.ref('images').child(imageBucket.name).getDownloadURL().then(image => {
          this.setState({image});})
    this.setState[imageBucket] = null;
    console.log(this.state);
    },
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

    const updateRef = fire.firestore().collection('Products').doc(this.state.key);
    updateRef.set({
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
      material3
    }).then((docRef) => {
      this.setState({
        key: '',
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
                <label for="category">Category:</label>
                <input type="text" class="form-control" name="category" value={this.state.category} onChange={this.onChange} placeholder="Category" />
              </div>
              <div class="form-group">
                {this.state.image !== '' && <div id="main-image-thumbnail">
                  <img id="thumbnail" src={this.state.image}/>
                  <button name="image" type="button" onClick={this.onImageRemove}><i class="fa fa-times"/></button>
                  <br/>
                  <br/>
                </div>}
                {this.state.image === '' && <label for="imageBucket">Upload main image:</label>}
                {this.state.image !== '' && <label for="imageBucket">Edit main image:</label>}
                <input type="file" class="form-control" name="imageBucket" onChange={this.onImageChange} />
                <button type="button" onClick={this.handleUpload}>Upload</button>
              </div>
              <div class="form-group">
                {this.state.moreImage !== '' && <div id="main-image-thumbnail">
                  <img id="thumbnail" src={this.state.moreImage}/>
                  <button type="button" name="moreImage" onClick={this.onImageRemove}><i class="fa fa-times"/></button>
                  <br/>
                  <br/>
                </div>}
                {this.state.moreImage === '' && <label for="imageBucket">Upload more images:</label>}
                {this.state.moreImage !== '' && <label for="imageBucket">Edit more images:</label>}
                <input type="file" class="form-control" name="moreImageBucket" onChange={this.onImageChange} />
                <button type="button" onClick={this.handleMoreUpload}>Upload</button>
              </div>
              <div class="form-group">
                <label for="description 1">Description:</label>
                <input type="text" class="form-control" name="description1" value={this.state.description1} onChange={this.onChange} placeholder="Paragraph 1" />
              </div>
              <div class="form-group">
                <label for="description 2">More Description:</label>
                <input type="text" class="form-control" name="description2" value={this.state.description2} onChange={this.onChange} placeholder="Paragraph 2" />
              </div>
              <div class="form-group">
                <label for="material1">Material 1:</label>
                <input type="text" class="form-control" name="material1" value={this.state.material1} onChange={this.onChange} placeholder="Material 1" />
              </div>
              <div class="form-group">
                <label for="material2">Material 2:</label>
                <input type="text" class="form-control" name="material2" value={this.state.material2} onChange={this.onChange} placeholder="Material 2" />
              </div>
              <div class="form-group">
                <label for="material3">Material 3:</label>
                <input type="text" class="form-control" name="material3" value={this.state.material3} onChange={this.onChange} placeholder="Material 3" />
              </div>
              <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" class="form-control" name="price" value={this.state.price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="care">Care 1:</label>
                <input type="text" class="form-control" name="care" value={this.state.care} onChange={this.onChange} placeholder="Care" />
              </div>
              <div class="form-group">
                <label for="care2">Care 2:</label>
                <input type="text" class="form-control" name="care2" value={this.state.care2} onChange={this.onChange} placeholder="Care 2" />
              </div>
              <div class="form-group">
                <label for="care3">Care 3:</label>
                <input type="text" class="form-control" name="care3" value={this.state.care3} onChange={this.onChange} placeholder="Care 3" />
              </div>
              <div class="form-group">
                <label for="care4">Care 4:</label>
                <input type="text" class="form-control" name="care4" value={this.state.care4} onChange={this.onChange} placeholder="Care 4" />
              </div>
              <div class="form-group">
                <label for="sizeGuide">Size Guide:</label>
                <input type="text" class="form-control" name="sizeGuide" value={this.state.sizeGuide} onChange={this.onChange} placeholder="Size Guide" />
              </div>
              <div class="form-group">
                <label for="howToOrder">How To Order:</label>
                <input type="text" class="form-control" name="howToOrder" value={this.state.howToOrder} onChange={this.onChange} placeholder="How To Order" />
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