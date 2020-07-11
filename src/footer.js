import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import LogoGold from './imgsrc/Jelujur_logo_gold.png'
 
class Footer extends Component {
  scrollToTop(){
    console.log("Clicked!");
    window.scrollTo(0, 0);
    console.log("Clicked!");
  };
  render() {
    return (
    <Fade>
        <br/>
        <div id="footer">
        <img src={LogoGold} onClick={() => this.scrollToTop()}/>
        </div>
        <hr id="line-footer"/>
        <Container id="footer-link">
        <Row>
            <Col>
                <a><p>Contact Us</p></a>
            </Col>
        </Row>
        <Row>
            <Col>
                <a href="https://instagram.com/jelujurlabel" target="_blank"><p>Instagram</p></a>
            </Col>
            <Col>
                <a href="mailto:jelujurlabel@gmail.com"><p>jelujurlabel@gmail.com</p></a>
            </Col>
            <Col>
                <a href=""><p>YouTube</p></a>
            </Col>
        </Row>
        </Container>
        <br/>
    </Fade>
    );
  }
}
 
export default Footer;