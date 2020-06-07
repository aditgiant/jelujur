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
      <Route path={process.env.PUBLIC_URL + '/jelujur/aboutus'} exact component={About}/>
      <Route path={process.env.PUBLIC_URL + '/jelujur/collections'} component={Lookbook}/>
      <Route path={process.env.PUBLIC_URL + '/jelujur/product/:id'} component={Product}/>
      <Route path={process.env.PUBLIC_URL + '/jelujur/admin'} component={Admin}/>
      <Route path={process.env.PUBLIC_URL + '/jelujur/adminedit/:id'} component={AdminEdit} />
      <Route path={process.env.PUBLIC_URL + '/jelujur/admincreate'} component={AdminCreate} />
      <Route path={process.env.PUBLIC_URL + '/jelujur/adminshow/:id'} component={AdminShow} />
      </Switch>
    </Router>
    </div>
  );
}
};

export default App;
