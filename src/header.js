import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import LogoGold from './imgsrc/Jelujur_logo_gold.png'
 
class Header extends Component {
  scrollToTop(){
    console.log("Clicked!");
    window.scrollTo(0, 0);
    console.log("Clicked!");
  };
  render() {
    return (
    <Fade>
        <div id="header">
        <Link to="/">
        <img src={LogoGold}/>
        </Link>
        </div>
    </Fade>
    );
  }
}
 
export default Header;