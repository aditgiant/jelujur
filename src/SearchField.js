import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './admin/Fire';
import SearchItems from './SearchItems';
import NumberFormat from 'react-number-format';

export default class SearchField extends Component {
    constructor(props){
        super(props);
        this.state = {
            keywords:'',
            boards: []
        }
        this.ref = fire.firestore().collection('Products')
        this.unsubscribe = null;
        this.handleChange = this.handleChange.bind(this);
    }
    
    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, image, category, price } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            image,
            category,
            price
          });
        });
        this.setState({...this.state,
          boards
       });
      }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    handleChange (e) {
        e.preventDefault();
        let value = e.target.value;
        this.setState({...this.state,
            keywords: value
        }, () => console.log(this.state))
    }

    setCursorSearch () {
        document.getElementById("search-form").focus();
    }

    render() {
        return (
        <div className = "search-field">
            <input
            id="search-form"
            className="search-form"
            type="string"
            value={this.state.keywords} 
            onChange={this.handleChange}
            placeholder="Type product here"
            />
             <p onClick={this.setCursorSearch}><Link style={{ color: '#fff', fontSize:'0.75em', textDecoration: 'none' }} to={`/`}>&nbsp; &nbsp;SEARCH</Link></p>
            {this.state.keywords !== "" && <div className="search-results">
                <p>Showing results for <strong>"{this.state.keywords}"</strong></p>
                <SearchItems keywords={this.state.keywords}/>        
            </div>}
        </div>
        )
    }
}