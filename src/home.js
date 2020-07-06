import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ShopNow from './imgsrc/iconShopNow.png'
import SidebarHome from './SidebarHome';
import Fade from 'react-reveal/Fade';
import Roll from 'react-reveal/Roll'
import makeCarousel from 'react-reveal/makeCarousel';
import Logo from './imgsrc/logo.png';
import Arrow from './imgsrc/arrow.gif';
import './App.css';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
const CarouselDiv = styled.div`
    text-align: center;
    justify-content: space-around;
    align-items: center;
    position: relative;
    height: 150px;
    overflow: hidden;
`;
const CarouselUI = ({ children }) => <CarouselDiv fluid>{children}</CarouselDiv>;
const Carousel = makeCarousel(CarouselUI);

export default class Home extends Component {
    scrollToDisplay(){
        console.log("Clicked!");
        window.scrollTo(0, window.innerHeight);
        console.log("Clicked!");
    };
    render() {
    return (
        <div>
        <SidebarHome/>
        <section id="home">
            <div className="home">
            <Container>
            <Roll right>
            <Row>
            <Col className="page-title">
            <div className="page-title">
                <img className="logo" src={Logo} alt='Jelujur'/>
            </div>
            </Col>
            </Row>
            <Row>
            <Col className="center-subtitle page-subtitle">
            <Carousel defaultWait={3000} /*wait for 1000 milliseconds*/ >
                <Fade top>
                    <h3 className="page-subtitle"><strong>SS20 COLLECTIONS</strong></h3>
                </Fade>
                <Fade top>
                    <h3 className="page-subtitle"><strong>FLORAL</strong></h3>
                </Fade>
                {/* <Fade top>
                    <h3 className="page-subtitle">for you.</h3>
                </Fade> */}
            </Carousel>
            </Col>
            </Row>
            </Roll>
            </Container>
            <Link to="/shopnow/top">
            <div className="shopnow-sidebar">
                <img src={ShopNow}/>
                
                <p>SHOP NOW</p>
            </div>
            </Link>
            <div className="discover">
                <a className="discover-hover" onClick={() => this.scrollToDisplay()}>
                <h3 className="text-discover">DISCOVER <br/></h3>
                <div className="arrow-holder">
                    <img className="arrow" src={Arrow} alt='Discover'/>
                </div>
                </a>
            </div>
            </div>
        </section>
        </div>
    );
  }
}