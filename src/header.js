import React from 'react';
import './header.css';
import Posts from './Posts';
import {
    Link
  } from "react-router-dom";

class Header extends React.Component {
     displayPosts(){
    return <Posts />
    }  
    render(){
          
      return (
        <nav>
          <div className="navBar">
          <Link to="/" className="link">Home</Link>
          <Link to="/posts" className="link">Posts</Link>
          <Link to="/contactUs" className="link" >Contact us</Link>
          </div>
        </nav>
      )
    }
  }
  
export default Header;  






      