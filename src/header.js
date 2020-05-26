import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import LogoGold from './imgsrc/Jelujur_logo_gold.png'

 
class Header extends Component {
  render() {
    return (
    <Fade>
        <div id="header">
        <img src={LogoGold}/>
        </div>
    </Fade>
    );
  }
}
 
export default Header;