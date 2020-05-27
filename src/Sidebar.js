import React, { Component } from "react";
import SidebarButton from './SidebarButton';
import {Link} from 'react-router-dom';
 
class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);
       
        this.state = {
          visible: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
      }
      
      handleMouseDown(e) {
        this.toggleMenu();
     
        console.log("clicked");
        e.stopPropagation();
      }
      
      toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
      }
    render() {
      var visibility = "hide";
 
      if (this.state.visible) {
        visibility = "show";
      }
    return (
      <div id='sidebar-group'>
        <SidebarButton handleMouseDown={this.handleMouseDown} visible={this.state.visible}/>
        <div id="flyoutMenu"
           onClick={this.handleMouseDown} 
           className={visibility}>
        <Link style={{ textDecoration: 'none' }} to={process.env.PUBLIC_URL + '/'}><h3><a>HOME</a></h3></Link>
        {/* <Link style={{ textDecoration: 'none' }} to={process.env.PUBLIC_URL + '/admin'}><h3><a>Admin</a></h3></Link> */}
        <Link style={{ textDecoration: 'none' }} to={process.env.PUBLIC_URL + '/aboutus'}><h3><a>ABOUT US</a></h3></Link>
        <h3><a href="#">SHOP NOW</a></h3>
        <Link style={{ textDecoration: 'none' }} to={process.env.PUBLIC_URL + '/collections'}><h3><a href="#">COLLECTIONS</a></h3></Link>
        <h3><a href="#">CONTACT US</a></h3>
      </div>
      </div>
    );
  }
}
 
export default Sidebar;