import React, { Component } from "react";
import SidebarButtonHome from './SidebarButtonHome';
import {Link} from 'react-router-dom';
 
class SidebarHome extends Component {
    constructor(props, context) {
        super(props, context);
       
        this.state = {
          visible: false,
          mainMenuExpand: true,
          shopNowExpand: false,
          collectionsExpand: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDownShopNow = this.handleMouseDownShopNow.bind(this);
        this.handleMouseDownShopNow2 = this.handleMouseDownShopNow2.bind(this);
        this.toggleShopNow = this.toggleShopNow.bind(this);
        this.handleMouseDownCollections = this.handleMouseDownCollections.bind(this);
        this.handleMouseDownCollections2 = this.handleMouseDownCollections2.bind(this);
        this.toggleCollections = this.toggleCollections.bind(this);
      }
      
      scrollToBottom(){
        console.log("Clicked!");
        window.scrollTo(0, document.body.scrollHeight);
        this.toggleMenu();
      };

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

      handleMouseDownShopNow(e) {
        this.toggleShopNow();
        console.log("clicked-ShopNow");
        e.stopPropagation();
      }
        
      toggleShopNow() {
        this.setState({
          shopNowExpand: !this.state.shopNowExpand,
          mainMenuExpand: !this.state.mainMenuExpand
        });
      }

      handleMouseDownShopNow2(e) {
        this.toggleMenu();
        this.toggleShopNow();
        console.log("clicked-ShopNow");
        e.stopPropagation();
      }

      handleMouseDownCollections(e) {
        this.toggleCollections();
        console.log("clicked-Collections");
        e.stopPropagation();
      }
        
      toggleCollections() {
        this.setState({
          collectionsExpand: !this.state.collectionsExpand,
          mainMenuExpand: !this.state.mainMenuExpand
        });
      }

      handleMouseDownCollections2(e) {
        this.toggleMenu();
        this.toggleCollections();
        console.log("clicked-Collections");
        e.stopPropagation();
      }


    render() {
      var visibility = "hide";
      var mainmenuexpand = "collapsed"
      var shopnowexpand ="collapsed"
      var collectionsexpand ="collapsed"
      if (this.state.visible) {
        visibility = "show";
      }
      if (this.state.mainMenuExpand) {
        mainmenuexpand = "expanded";
      }
      if (this.state.shopNowExpand) {
        shopnowexpand = "expanded";
      }
      if (this.state.collectionsExpand) {
        collectionsexpand = "expanded";
      }
    return (
      <div id='sidebar-group'>
        <SidebarButtonHome handleMouseDown={this.handleMouseDown} visible={this.state.visible}/>
        <div id="flyoutMenu"
           className={visibility}>
            {(mainmenuexpand==="expanded") && <div id="flyoutMenu-page">
              <Link style={{ textDecoration: 'none' }} to='/' onClick={this.handleMouseDown}><div className="flyoutMenu-item"><h3>HOME</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/aboutus' onClick={this.handleMouseDown}><div className="flyoutMenu-item"><h3>ABOUT US</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} onClick={this.handleMouseDownShopNow}><div className="flyoutMenu-item"><h3>SHOP NOW</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} onClick={this.handleMouseDownCollections}><div className="flyoutMenu-item"><h3>COLLECTIONS</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <div className="flyoutMenu-item"><h3 onClick={() => this.scrollToBottom()}>CONTACT US</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div>
            </div>}
            {(shopnowexpand==="expanded") && <div id="flyoutMenu-page">
              <Link style={{ textDecoration: 'none' }} onClick={this.handleMouseDownShopNow}><div className="flyoutMenu-item"><h3 id="flyoutBackArrow">&lt;&nbsp;</h3><h3>SHOP NOW</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/top' onClick={this.handleMouseDownShopNow2}><div className="flyoutMenu-item"><h3>Top</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/skirt' onClick={this.handleMouseDownShopNow2}><div className="flyoutMenu-item"><h3>Skirt</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/trousers' onClick={this.handleMouseDownShopNow2}><div className="flyoutMenu-item"><h3>Trousers</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/dress' onClick={this.handleMouseDownShopNow2}><div className="flyoutMenu-item"><h3>Dress</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/shopnow/outer' onClick={this.handleMouseDownShopNow2}><div className="flyoutMenu-item"><h3>Outer</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
            </div>}
            {(collectionsexpand==="expanded") && <div id="flyoutMenu-page">
              <Link style={{ textDecoration: 'none' }} onClick={this.handleMouseDownCollections}><div className="flyoutMenu-item"><h3 id="flyoutBackArrow">&lt;&nbsp;</h3><h3>COLLECTIONS</h3></div></Link>
              <Link style={{ textDecoration: 'none' }} to='/collections/ss2020' onClick={this.handleMouseDownCollections2}><div className="flyoutMenu-item"><h3>Spring-Summer 2020</h3><h3 id="flyoutArrow">&gt;&nbsp;</h3></div></Link>
            </div>}
      </div>
      </div>
    );
  }
}
 
export default SidebarHome;