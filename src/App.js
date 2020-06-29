import React, { Component } from 'react';
import Welcome from './Welcome';
import About from './About';
import ShopNow from './ShopNow';
import Lookbook from './Lookbook';
import Product from './product';
import Display from './Display';
import Admin from './admin/Admin';
import AdminEdit from './admin/Edit';
import AdminCreate from './admin/AdminCreate';
import AdminShow from './admin/Show'
import logo from './logo.svg';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render(){
  return (
    <div>
    <Welcome/>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={createBrowserHistory()}>
      <Switch>
      <Route path='/' exact component={Display}/>
      <Route path='/aboutus' component={About}/>
      <Route path='/shopnow/:filterID' component={ShopNow}/>
      <Route path='/collections/ss2020' component={Lookbook}/>
      <Route path='/product/:id' component={Product}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/adminedit/:id' component={AdminEdit} />
      <Route path='/admincreate' component={AdminCreate} />
      <Route path='/adminshow/:id' component={AdminShow} />
      </Switch>
    </Router>
    </div>
  );
}
};

export default App;
