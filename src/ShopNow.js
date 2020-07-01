import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Sidebar from './Sidebar';
import Header from './header';
import Footer from './footer';
import Loading from './Loading';
import Fade from 'react-reveal/Fade';
import fire from './admin/Fire';
 
class ShopNow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          filterID: this.props.match.params.filterID,
          boards: []
        };
        this.ref = fire.firestore().collection('Products');
        this.unsubscribe = null;
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.setState({ ...this.state,
            filterID : this.props.match.params.filterID
          });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.filterID !== prevProps.match.params.filterID) {
            this.setState({ ...this.state,
                filterID : this.props.match.params.filterID
              });
      }
    } 

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, image, category, price } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            image,
            category,
            price
          });
        });
        this.setState({
          boards
       });
    }

    render() {
        console.log(this.state.filterID);
    return (
    <>
    <Loading/>
    <Sidebar/>
    <div id="shop-now">
        <Header/>
        <Container id="catalog-content">
        <Row>
            <Col id="shop-now-filter" sm={2}>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/top'><div className="flyoutMenu-item"><h3>Top</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              {/* <Link style={{ textDecoration: 'none' }} to='/shopnow/skirt'><div className="flyoutMenu-item"><h3>Skirt</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/trousers'><div className="flyoutMenu-item"><h3>Trousers</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link> */}
              <Link style={{ textDecoration: 'none' }} to='/shopnow/dress'><div className="flyoutMenu-item"><h3>Dress</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/outer'><div className="flyoutMenu-item"><h3>Outer</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
            </Col>
            <Col id="shop-now-show" sm={10}>
                <p>Showing items for '{this.state.filterID}' category</p>
                {this.state.boards.map(board => board.category === this.state.filterID ?
                    (<div id='product-list-shopnow'>
                        <Link style={{ textDecoration: 'none' }} to={`/productFromCategory/${board.key}`}>
                            <div id='product-show-shopnow'><img id="thumbnail" src={board.image}/></div>
                            <p><strong>{board.title}</strong><br/>
                            <NumberFormat value={board.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' IDR'} /></p>
                        </Link>
                    </div>) : (<></>)
                    )}
            </Col>
        </Row>
        </Container>
        <Footer/>
    </div>
    </>
    );
  }
}
 
export default ShopNow;