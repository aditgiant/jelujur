import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import fire from './Fire';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.ref = fire.firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, image, description } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            image,
            description,
          });
        });
        this.setState({
          boards
       });
      }
    
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
        <Container>
            <button style={{'position':'absolute', 'top':'5vh', 'right':'5vw'}} type="submit" onClick={this.logout} class="btn btn-primary">Logout</button>
            <br/>
            <div class="panel panel-default">
          <div class="panel-body">
            <h1>List of Boards</h1>
            <h3><Link style={{'fontFamily':'Manrope'}} to="/admincreate">+ Add Board</Link></h3>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  {/* <th>Image</th> */}
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link style={{'fontFamily':'Manrope'}} to={`/adminshow/${board.key}`}>{board.title}</Link></td>
                    {/* <td>{board.image}</td> */}
                    <td>{board.description}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </Container>
        );
    }

}

export default AdminHome;