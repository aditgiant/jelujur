import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import fire from './admin/Fire';
import { Link } from 'react-router-dom';
import Header from './header';
import Fade from 'react-reveal/Fade';

class Product extends Component {

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

  render() {
    return (
        <div>
        <Header/>
        <Container id="product-content">
        <Row><Col sm='2' id="back-to-catalog">
            <Link to="/collections"><h3>&lt;</h3><p> Back to Collections</p></Link>
        </Col>
        <Col sm='6' id="product-thumbnail">
          {this.state.board.image !== '' && <img id="thumbnail" src={this.state.board.image}/>}
        </Col>
        <Col sm='4' id="product-description">
            <h3 class="panel-title">
                {this.state.board.title}
            </h3>
            <p>{this.state.board.description}</p>
        </Col>
        </Row>
        </Container>
        </div>
    );
  }
}

export default Product;