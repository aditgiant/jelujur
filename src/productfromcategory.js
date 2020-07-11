import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SizeChart from './imgsrc/Size_chart.jpeg';
import Collapse from 'react-bootstrap/Collapse'
import NumberFormat from 'react-number-format';
import fire from './admin/Fire';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './header';
import Footer from './footer';
import OrderForm from './orderform';
import Fade from 'react-reveal/Fade';

class ProductFromCategory extends Component {

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
        <Sidebar/>
        <Header/>
        <Container id="product-content">
        <Row><Col sm='2' id="back-to-catalog">
            <Link to={`/shopnow/${this.state.board.category}`}><h3> &lt;</h3><p>&nbsp;Shop Now</p></Link>
        </Col>
        <Col sm='5' id="product-thumbnail">
          <div className="thumbnails">
            <img id="main-thumbnail" className={imageActive} src={this.state.board.image}/>
            {this.state.board.moreImage !== '' && <img id="second-thumbnail" className={imageActive} src={this.state.board.moreImage}/>}
          </div>
        </Col>
        <Col sm='1' id="navigation-thumbnail-box">
        {this.state.board.moreImage !== '' && <div id="navigation-thumbnail" className={imageActive} onClick={this.handleMouseDown}><h1>&gt;</h1></div>}
        </Col>
        <Col sm='4' id="product-description">
            <strong><h5 class="product-title">
                {this.state.board.title}
            </h5>
            <h6><NumberFormat value={this.state.board.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' IDR'} /></h6></strong>
            <br/>
            <p>{this.state.board.description1}</p>
            <p>{this.state.board.description2}</p>
            <br/>
            <p>{this.state.board.material1}<br/>
            {this.state.board.material2}<br/>
            {this.state.board.material3}</p>
            <br/>
            <div className={"toggle toggle-"+this.state.careExpand} onClick = {this.handleCareExpand}>
              <strong><h3>&gt;</h3>
              <p>&nbsp;CARE</p></strong>
            </div>
              <Collapse in={this.state.careExpand}>
                <div id="toggle-content">
                <p>{this.state.board.care}
                <br/>{this.state.board.care2}
                <br/>{this.state.board.care3}
                <br/>{this.state.board.care4}</p>
                </div>
              </Collapse>
            <div className={"toggle toggle-"+this.state.sizeExpand} onClick = {this.handleSizeExpand}>
              <strong><h3>&gt;</h3>
              <p>&nbsp;SIZE GUIDE</p></strong>
            </div>
              <Collapse in={this.state.sizeExpand}>
              <div id="toggle-content">
            {/* <table class="table table-bordered" border="1" bordercolor="#a17C63">
              <thead>
                <tr>
                  <th><p>Measurement</p></th>
                  <th><p>&nbsp;&nbsp;S&nbsp;&nbsp;</p></th>
                  <th><p>&nbsp;&nbsp;M&nbsp;&nbsp;</p></th>
                  <th><p>&nbsp;&nbsp;L&nbsp;&nbsp;</p></th>
                  <th><p>XL</p></th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td><p>Bust</p></td>
                    <td><p>84 cm</p></td>
                    <td><p>89 cm</p></td>
                    <td><p>94 cm</p></td>
                    <td><p>99 cm</p></td>
                  </tr>
                  <tr>
                    <td><p>Waist</p></td>
                    <td><p>65 cm</p></td>
                    <td><p>70 cm</p></td>
                    <td><p>75 cm</p></td>
                    <td><p>80 cm</p></td>
                  </tr>
                  <tr>
                    <td><p>Hip</p></td>
                    <td><p>91 cm</p></td>
                    <td><p>96 cm</p></td>
                    <td><p>101 cm</p></td>
                    <td><p>106 cm</p></td>
                  </tr>
              </tbody>
            </table> */}
                <img src={SizeChart}/>
                <br/>
                <br/>
                </div>
              </Collapse>
            <div className={"toggle toggle-"+this.state.orderExpand} onClick = {this.handleOrderExpand}>
              <strong><h3>&gt;</h3>
              <p>&nbsp;HOW TO ORDER</p></strong>
              </div>
              <div className="orderpopup" id={"orderpopup-"+this.state.orderExpand}>
                <OrderForm handleOrderExpand={this.handleOrderExpand}
                           orderExpand={this.state.orderExpand}
                           product={this.state.board.title}
                           />
            </div>
            
        </Col>
        </Row>
        </Container>
        <Footer/>
        </div>
    );
  }
}

export default ProductFromCategory;