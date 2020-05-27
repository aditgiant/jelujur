import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse'
import NumberFormat from 'react-number-format';
import fire from './admin/Fire';
import { Link } from 'react-router-dom';
import Header from './header';
import Fade from 'react-reveal/Fade';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: '',
      second:false,
      careExpand:false,
      sizeExpand:false,
      orderExpand:false,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleCareExpand = this.handleCareExpand.bind(this);
    this.handleSizeExpand = this.handleSizeExpand.bind(this);
    this.handleOrderExpand = this.handleOrderExpand.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();
    console.log("clicked");
    e.stopPropagation();
  }
  
  toggleMenu() {
    console.log(this.state.second);  
    this.setState({
      second: !this.state.second
    });
  }

  handleCareExpand() {
    this.setState({careExpand : !this.state.careExpand});
    console.log(this.state.careExpand);
  }

  handleSizeExpand() {
    this.setState({sizeExpand : !this.state.sizeExpand});
    console.log(this.state.sizeExpand);
  }

  handleOrderExpand() {
    this.setState({orderExpand : !this.state.orderExpand});
    console.log(this.state.orderExpand);
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
    var imageActive = "main-thumbnail-show";
    if (this.state.second) {
        imageActive = "second-thumbnail-show";
    }
    return (
        <div>
        <Header/>
        <Container id="product-content">
        <Row><Col sm='2' id="back-to-catalog">
            <Link to="/collections"><h3> &lt;</h3><p>&nbsp;Back to Collections</p></Link>
        </Col>
        <Col sm='5' id="product-thumbnail">
          <div className="thumbnails">
            <img id="main-thumbnail" className={imageActive} src={this.state.board.image}/>
            {this.state.board.moreImage !== '' && <img id="second-thumbnail" className={imageActive} src={this.state.board.moreImage}/>}
          </div>
        </Col>
        <Col sm='1' id="product-thumbnail">
        {this.state.board.moreImage !== '' && <div id="navigation-thumbnail" className={imageActive} onClick={this.handleMouseDown}><h1>&gt;</h1></div>}
        </Col>
        <Col sm='4' id="product-description">
            <h4 class="product-title">
                {this.state.board.title}
            </h4>
            <h5><NumberFormat value={this.state.board.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' IDR'} /></h5>
            <br/>
            <p>{this.state.board.description1}</p>
            <p>{this.state.board.description2}</p>
            <br/>
            <p>{this.state.board.material1}<br/>
            {this.state.board.material2}<br/>
            {this.state.board.material3}</p>
            <br/>
            <div className={"toggle toggle-"+this.state.careExpand} onClick = {this.handleCareExpand}>
              <h3>&gt;</h3>
              <p>&nbsp;CARE</p>
            </div>
              <Collapse in={this.state.careExpand}>
                <p>{this.state.board.care}</p>
              </Collapse>
            <div className={"toggle toggle-"+this.state.sizeExpand} onClick = {this.handleSizeExpand}>
              <h3>&gt;</h3>
              <p>&nbsp;SIZE GUIDE</p>
            </div>
              <Collapse in={this.state.sizeExpand}>
                <p>{this.state.board.sizeGuide}</p>
              </Collapse>
            <div className={"toggle toggle-"+this.state.orderExpand} onClick = {this.handleOrderExpand}>
              <h3>&gt;</h3>
              <p>&nbsp;HOW TO ORDER</p>
            </div>
              <Collapse in={this.state.orderExpand}>
                <p>{this.state.board.howToOrder}</p>
              </Collapse>
        </Col>
        </Row>
        </Container>
        </div>
    );
  }
}

export default Product;