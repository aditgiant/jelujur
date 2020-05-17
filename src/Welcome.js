import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import Loading from './imgsrc/Jelujur_logoori.gif'

export default class Welcome extends Component {
    constructor() {
        super()
    
        this.src = Loading
      }
    render () {
    if (this.gif)
      this.gif.src = this.src
        return (
            <div className = "loading">
                <Fade>
                <img src={this.src} className = 'loading-gif' ref={input => this.gif = input}/>
                </Fade>
            </div>
        )
    }
}