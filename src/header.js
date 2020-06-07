import React, { Component } from "react";
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
        <img src={LogoGold} onClick={() => this.scrollToTop()}/>
        </div>
    </Fade>
    );
  }
}
 
export default Header;