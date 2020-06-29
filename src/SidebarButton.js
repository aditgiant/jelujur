import React, { Component } from "react";
import Menu from './imgsrc/hamburger.png'
import CloseMenu from './imgsrc/close.png'
 
class SidebarButton extends Component {
  render() {
    var visibilitybutton = "hide";
      if (this.props.visible) {
        visibilitybutton = "show";
      }
    return (
      <button id="roundButton"
              onMouseDown={this.props.handleMouseDown}
              className={visibilitybutton}>
              {visibilitybutton==="hide" && <img className="roundButton-icon" src={Menu}/>}
              {visibilitybutton==="show" && <img className="roundButton-icon" src={CloseMenu}/>}
              </button>
    );
  }
}
 
export default SidebarButton;