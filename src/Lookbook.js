import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import Header from './header';
import Footer from './footer';
import Loading from './Loading'
import Fade from 'react-reveal/Fade';
import fire from './admin/Fire';

class Lookbook extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.ref = fire.firestore().collection('Products');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, image, category } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            image,
            category
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
        <>
        <Loading/>
        <div>
        <Header/>
        <Container id="catalog-content">
          {/* <div id="lookbook"> */}
            {this.state.boards.map(board =>
                  <div id='product-list'>
                    <Link to={`/product/${board.key}`}>
                      <div id='product-hover'>
                        <h3>View <br/><strong>{board.title}</strong></h3>
                      </div>
                    </Link>
                    <div id='product-show'><img id="thumbnail" src={board.image}/></div>
                  </div>
            )}
          {/* </div> */}
        </Container>
        <Footer/>
        </div>
        </>
        );
    }

}

export default Lookbook;