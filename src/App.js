import React from 'react';
import fetch from 'axios'
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Posts from './Posts';
import ContactUs from './ContactUs';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  render() {
    return (
      <Router>
        <div>
          <nav>
            <table>
              <thead>
                <tr>
                  <td>
                    <Link to="/">Home</Link>
                  </td>
                  <td>
                    <Link to="/posts">Posts</Link>
                  </td>
                  <td>
                  <Link to="/contactUs">Contact us</Link>
                  </td>
                </tr>
              </thead>
            </table>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/contactUs">
              <ContactUs />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );

  }
  
}



export default App;