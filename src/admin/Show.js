import React, { Component } from 'react';
import fire from './Fire';
import { Link } from 'react-router-dom';

class AdminShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = fire.firestore().collection('Products').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    fire.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/admin")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h3><Link style={{'fontFamily':'Manrope'}} to="/admin">&lt; Back to Board List</Link></h3>
          <br/>
            <h3 class="panel-title">
              {this.state.board.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Category:</dt>
              <dd>{this.state.board.category}</dd>
              <dt>Main image:</dt>
              <dd>{this.state.board.image !== '' && <img id="thumbnail" src={this.state.board.image}/>}</dd>
              <dt>More images:</dt>
              <dd>{this.state.board.moreImage !== '' && <img id="thumbnail" src={this.state.board.moreImage}/>}</dd>
              <dt>Description:</dt>
              <dd>{this.state.board.description}</dd>
            </dl>
            <Link style={{'fontFamily':'Manrope'}} to={`/adminedit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminShow;