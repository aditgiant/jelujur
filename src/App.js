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
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render(){
  return (
    <div>
    <Welcome/>
    <Router>
      <Sidebar/>
      <Switch>
      <Route path={process.env.PUBLIC_URL + '/'} exact component={Display}/>
      <Route path={process.env.PUBLIC_URL + '/aboutus'} exact component={About}/>
      <Route path={process.env.PUBLIC_URL + '/collections'} component={Lookbook}/>
      <Route path={process.env.PUBLIC_URL + '/product/:id'} component={Product}/>
      <Route path={process.env.PUBLIC_URL + '/admin'} component={Admin}/>
      <Route path={process.env.PUBLIC_URL + '/adminedit/:id'} component={AdminEdit} />
      <Route path={process.env.PUBLIC_URL + '/admincreate'} component={AdminCreate} />
      <Route path={process.env.PUBLIC_URL + '/adminshow/:id'} component={AdminShow} />
      </Switch>
    </Router>
    </div>
  );
}
};

export default App;
