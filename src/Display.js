import React, { Component, useRef, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Home from './home';
import Footer from './footer';
import fire from './admin/Fire';
import {Container, Row, Col} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import featuredDress from './imgsrc/featured_Diascia Midi-dress.png';
import featuredTop from './imgsrc/featured_Dahlia Croptop.png';
import featuredOuter from './imgsrc/featured_Gaura Blazer.png';
import Rack from './imgsrc/featured_Racktitile.png'
import './App.css';

// function useHover1(){
//     const ref1 = useRef();
//     const [hovered1, setHovered1] = useState (false);
    
//     const enter = () => setHovered1 (true);
//     const leave = () => setHovered1 (false);
    
//     useEffect(() => {
//         ref1.current.addEventListener('mouseenter', enter);
//         ref1.current.addEventListener('mouseleave', leave);
//         return () => {
//             ref1.current.removeEventListener('mouseenter', enter);
//             ref1.current.removeEventListener('mouseleave', leave);
//         }
//     }, [ref1])

//     return [ref1, hovered1];
// };

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
          featuredCategory: 'new',
          featuredCounts: 0,
          board: []
        };
        this.ref = fire.firestore().collection('featuredProducts');
        this.unsubscribe = null;
        this.toggleFeaturedCategory = this.toggleFeaturedCategory.bind(this);
        this.toggleFeaturedAll = this.toggleFeaturedAll.bind(this);
      }
    
    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, category, featuredImage, idProduct } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            category,
            featuredImage,
            idProduct
          });
        });
        this.setState({
          boards
       });
      }
    
    componentDidMount() {
        console.log(this.state.featuredCategory);
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    toggleFeaturedAll () {
        // e.preventDefault();
        this.setState({...this.state,
            featuredCategory: 'new'
        }, () => console.log(this.state.featuredCategory));
    }

    toggleFeaturedCategory (e) {
        e.preventDefault();
        let value = e.target.value;
        console.log(value);
        this.setState({...this.state,
            featuredCategory: value
        }, () => console.log(this.state.featuredCategory));
    }

    render(){
    return (
            <>
            <Home/>
            <section id="display">
                <div className="display">
                        <div className="display-title">
                            <img src={Rack}/>
                            {this.state.featuredCategory === 'new' && <div className="display-title-text"><h4>{this.state.featuredCategory}</h4></div>}
                            {this.state.featuredCategory !== 'new' && <><h4 id="back-arrow" onClick={this.toggleFeaturedAll}>&lt;</h4><div className="display-title-text"><h4>&nbsp;{this.state.featuredCategory}</h4></div></>}
                        </div>
                        <div className="display-holder">
                            {this.state.featuredCategory === 'new' && <form style={{"left":"10%"}}>
                                <input 
                                    id="featured-top" class="input-hidden" type="radio" checked={this.state.featuredCategory === "top"} onChange={this.toggleFeaturedCategory} value="top"/>
                                <label for="featured-top">
                                    <img className="product" src={featuredTop} alt='Product 1'/>
                                </label>
                                <input 
                                    id="featured-dress" class="input-hidden" type="radio" checked={this.state.featuredCategory === "dress"} onChange={this.toggleFeaturedCategory} value="dress"/>
                                <label for="featured-dress">
                                    <img className="product" style={{'left':'25%'}} src={featuredDress} alt='Product 2'/>
                                </label>
                                <input 
                                    id="featured-outer" class="input-hidden" type="radio" checked={this.state.featuredCategory === "outer"} onChange={this.toggleFeaturedCategory} value="outer"/>
                                <label for="featured-outer">
                                    <img className="product" style={{'left':'50%'}} src={featuredOuter} alt='Product 3'/>
                                </label>
                            </form>}
                            {(this.state.featuredCategory === 'outer' || this.state.featuredCategory === 'top') && <div style={{"width":"100%", "text-align":"center"}}>
                            {this.state.boards.map(board => board.category === this.state.featuredCategory ?
                                (<div className="display-items">
                                <Link style={{ textDecoration: 'none' }} to={`/product/${board.idProduct}`}>
                                        <img id="product-categorized" className="product" src={board.featuredImage}/>
                                </Link>
                                </div>) : (<></>)
                                )}
                            </div>}
                            {this.state.featuredCategory === 'dress' && <div style={{"width":"100%", "margin-left":"-7.5%", "text-align":"center"}}>
                            {this.state.boards.map(board => board.category === this.state.featuredCategory ?
                                (<div className="display-items-6">
                                <Link style={{ textDecoration: 'none' }} to={`/product/${board.idProduct}`}>
                                        <img id="product-categorized-6" className="product" src={board.featuredImage}/>
                                </Link>
                                </div>) : (<></>)
                                )}
                            </div>}
                        </div>
                </div>
                <Footer/>
            </section>
            </>
    );
}}

export default Display;