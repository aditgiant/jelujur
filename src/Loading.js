import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import JelujurLogo from './imgsrc/Jelujur_logospeedup.gif'

export default class Loading extends Component {
    render () {
        return (
            <div className = "loading-lookbook">
                <Fade>
                <img src={JelujurLogo} className = 'loading-gif' />
                </Fade>
            </div>
        )
    }
}