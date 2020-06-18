import React, { Component } from 'react';
import Welcome from './Welcome';
import About from './About';
import Lookbook from './Lookbook';
import Product from './product';
import Display from './Display';
import Sidebar from './Sidebar';
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
      <Sidebar/>
      <Switch>
      <Route path='/' exact component={Display}/>
      <Route path='/aboutus' exact component={About}/>
      <Route path='/collections' component={Lookbook}/>
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
