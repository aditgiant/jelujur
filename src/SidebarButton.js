import React, { Component } from "react";
 
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
              {visibilitybutton==="hide" && <i class="fa fa-bars"></i>}
              {visibilitybutton==="show" && <i class="fa fa-times"></i>}
              </button>
    );
  }
}
 
export default SidebarButton;