import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import Header from './header.js';
import Footer from './footer';
import Sidebar from './Sidebar';
import LogoGold from './imgsrc/Jelujur_logo_gold.png'

 
class About extends Component {
  render() {
    return (
    <div>
    <Sidebar/>
    <Header/>
        <div id="aboutus-background">
        </div>
            <Container>
            <Col id="aboutus-content" sm="8">
                <br/>
                <Fade left>
                <h4><strong>ABOUT US</strong></h4>
                </Fade>
                <br/>
                <br/>
                <br/>
                <Fade right>
                <p id="founder-title"><strong>Founder</strong></p>
                <p>
                Graduated from ISTITUTO DI MODA BURGO MILANO, Italy, Shellina Thenata is The Creative Director 
                and Designer of Jelujurlabel. Quite shy and self-contained, she often speak with her artwork. 
                Attention to details and art has been the main influence on how she creates and designing Jelujur’s collection. 
                Not only presents an attractive design, she also has a vision to produce comfortness on every piece of Jelujurlabel.
                </p>
                <p>
                Jelujurlabel will continue to develop itself into a local brand that has its own uniqueness, which inspires and
                able to compete with International brands.
                </p>
                </Fade>
            </Col>
        </Container>
    <Footer/>
    </div>
    );
  }
}
 
export default About;