import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './admin/Fire';
import SearchItems from './SearchItems';
import NumberFormat from 'react-number-format';

export default class SearchFieldHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            keywords:'',
            searchActive:false,
            boards: []
        }
        this.ref = fire.firestore().collection('Products')
        this.unsubscribe = null;
        this.handleChange = this.handleChange.bind(this);
        this.onInputFocused = this.onInputFocused.bind(this);
        this.onCloseSearch = this.onCloseSearch.bind(this);
    }

    handleChange (e) {
        e.preventDefault();
        let value = e.target.value;
            this.setState({...this.state,
                keywords: value,
            }, () => console.log(this.state))
    }

    onCloseSearch() {
        this.setState({...this.state, 
            searchActive : false})
    }

    onInputFocused() {
        this.setState({...this.state, 
            searchActive : true})
    }

    setCursorSearch () {
        document.getElementById("search-form2").focus();
    }

    render() {
        return (
        <div className = "search-field">
            <input
            id="search-form2"
            className="search-form"
            onFocus={this.onInputFocused}
            type="string"
            value={this.state.keywords} 
            onChange={this.handleChange}
            placeholder="Search on Jelujur"
            />
             <p onClick={this.setCursorSearch}><Link style={{ color: '#DFC691', fontSize:'0.75em', textDecoration: 'none' }} to={`/`}>&nbsp; &nbsp;SEARCH</Link></p>
            {this.state.searchActive &&
            <div className="search-results">
                <div className="search-header">
                {this.state.keywords == '' && <p>Type a product name or category...</p>}
                {this.state.keywords !== '' && <p>Showing results for <strong>"{this.state.keywords}"</strong></p>}
                <p className="search-close" onClick={this.onCloseSearch}><strong>X</strong></p>
                </div>
                {this.state.keywords !== "" && 
                <SearchItems onClick={this.setCursorSearch} keywords={this.state.keywords}/>}        
            </div>}
        </div>
        )
    }
}