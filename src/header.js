import React from 'react';
import {
    Link
  } from "react-router-dom";

class Header extends React.Component {
    render(){
      return (
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
      )
    }
  }
  
export default Header;  






      