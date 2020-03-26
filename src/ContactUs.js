import React from 'react';
import {
  Link
} from "react-router-dom";


class ContactUs extends React.Component {

  componentDidMount() {
    setTimeout(()=>{
      this.props.history.push('/posts');
    },4000)
  }

  render(){
    console.log('Banggg',this.props);
    return (
      <div>
        Contact us!!
      </div>
    )
  }
}
  
export default ContactUs;  