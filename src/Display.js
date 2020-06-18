import React, { Component, useRef, useState, useEffect } from 'react';
import Home from './home';
import Footer from './footer';
import {Container, Row, Col} from 'react-bootstrap';
import DisplayHanger from './imgsrc/hanger_spotlight.png';
import DisplayHanger2 from './imgsrc/Hanger_big_screen.png';
import Fade from 'react-reveal/Fade';
import Plants from './imgsrc/Decorating_plants.png';
import Product1 from './imgsrc/Product_1.png';
import Product2 from './imgsrc/Product_2.png';
import Product3 from './imgsrc/Product_3.png';
import Product4 from './imgsrc/Product_4.png';
import Product5 from './imgsrc/Product_5.png';
import './App.css';

function useHover1(){
    const ref1 = useRef();
    const [hovered1, setHovered1] = useState (false);
    
    const enter = () => setHovered1 (true);
    const leave = () => setHovered1 (false);
    
    useEffect(() => {
        ref1.current.addEventListener('mouseenter', enter);
        ref1.current.addEventListener('mouseleave', leave);
        return () => {
            ref1.current.removeEventListener('mouseenter', enter);
            ref1.current.removeEventListener('mouseleave', leave);
        }
    }, [ref1])

    return [ref1, hovered1];
};

function useHover2(){
    const ref2 = useRef();
    const [hovered2, setHovered2] = useState (false);
    
    const enter = () => setHovered2 (true);
    const leave = () => setHovered2 (false);
    
    useEffect(() => {
        ref2.current.addEventListener('mouseenter', enter);
        ref2.current.addEventListener('mouseleave', leave);
        return () => {
            ref2.current.removeEventListener('mouseenter', enter);
            ref2.current.removeEventListener('mouseleave', leave);
        }
    }, [ref2])

    return [ref2, hovered2];
};

function useHover3(){
    const ref3 = useRef();
    const [hovered3, setHovered3] = useState (false);
    
    const enter = () => setHovered3 (true);
    const leave = () => setHovered3 (false);
    
    useEffect(() => {
        ref3.current.addEventListener('mouseenter', enter);
        ref3.current.addEventListener('mouseleave', leave);
        return () => {
            ref3.current.removeEventListener('mouseenter', enter);
            ref3.current.removeEventListener('mouseleave', leave);
        }
    }, [ref3])

    return [ref3, hovered3];
};

function useHover4(){
    const ref4 = useRef();
    const [hovered4, setHovered4] = useState (false);
    
    const enter = () => setHovered4 (true);
    const leave = () => setHovered4 (false);
    
    useEffect(() => {
        ref4.current.addEventListener('mouseenter', enter);
        ref4.current.addEventListener('mouseleave', leave);
        return () => {
            ref4.current.removeEventListener('mouseenter', enter);
            ref4.current.removeEventListener('mouseleave', leave);
        }
    }, [ref4])

    return [ref4, hovered4];
};

export default function Display() {
    const [ref1, hovered1] = useHover1();
    const [ref2, hovered2] = useHover2();
    const [ref3, hovered3] = useHover3();
    const [ref4, hovered4] = useHover4();
    return (
            <>
            <Home/>
            <section id="display">
                <div className="display">
                <Fade effect="fadeIn" effectOut="fadeOut">
                <Container>
                    
                    <Row>
                        <Col xs={9}>
                        <div className="display-holder">
                            <img className="display-hanger" src={DisplayHanger2} alt='Featured'/>
                            <img className="product1" src={Product4} ref={ref1} alt='Product 1'/>
                            <img className="product2" src={Product1} ref={ref2} alt='Product 2'/>
                            <img className="product3" src={Product5} ref={ref3} alt='Product 3'/>
                            <img className="product4" src={Product2} ref={ref4} alt='Product 2'/>
                        </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={5} id="display-description">
                            {(hovered1==false && hovered2==false && hovered3==false && hovered4==false) && <div id='detail-headline' className="display-detail">
                                <h3><strong>Summer</strong> is here.</h3>
                            </div>}
                            {hovered1 && <div id='detail-product1' className="display-detail">
                                <h3><strong>Sun-worship</strong></h3>
                                <p>Shout to the beach party. You're beautiful and everyone should see!</p>
                            </div>}
                            {hovered2 && <div id='detail-product2' className="display-detail">
                                <h3><strong>Boom-boom-top</strong></h3>
                                <p>Welcome best season of the year with some skin.</p>
                            </div>}
                            {hovered3 && <div id='detail-product3' className="display-detail">
                                <h3><strong>Shine!</strong></h3>
                                <p>Flattering and feminine. Dress yours up with the beautiful details one can never stand.</p>
                            </div>}
                            {hovered4 && <div id='detail-product4' className="display-detail">
                                <h3><strong>Burning hot red!</strong></h3>
                                <p>Tell the world you're that spicy, little girl against the mainstream stereotyping</p>
                            </div>}
                        </Col>
                    </Row>
                </Container>
                </Fade>
                </div>
                <Footer/>
            </section>
            </>
    );
}
