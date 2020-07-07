import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fire from './admin/Fire';
import NumberFormat from 'react-number-format';

export default class SearchItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            keywords:'',
            boards: []
        }
        this.ref = fire.firestore().collection('Products')
        this.unsubscribe = null;
        this.updateKeywords = this.updateKeywords.bind(this);
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

    componentDidUpdate(prevProps) {
        console.log('changed!')
        if (this.props.keywords !== prevProps.keywords) {
            this.updateKeywords();
        }
    }

    async updateKeywords () {
        this.unsubscribe = this.ref.where("category", "==", this.props.keywords).onSnapshot(this.onCollectionUpdate);
    }

    render() {
        console.log(this.state.keywords);
        console.log(this.props.keywords);
        return (
        <div id="searchresulsthere">
        {this.state.boards.map(board =>
                    <Link to={`/product/${board.key}`} style={{ color: '#000', fontSize:'0.75em', textDecoration: 'none' }}>
                        <div className="search-item">
                            <div id="thumbnail-search">
                                <img id="thumbnail-search" src={`${board.image}=10`}/>
                            </div>
                        <p><strong>{board.title}</strong>
                        <br/><NumberFormat value={board.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' IDR'}/></p>
                        </div>
                    </Link>
        )}
        </div>
        )
    }
}