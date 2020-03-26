import React from 'react';
import './Posts.css';

class Posts extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        postsArray: []
      };

      this.onPosts = this.onPosts.bind(this);
    }

    onPosts() {
       
      const url = 'https://cat-fact.herokuapp.com/facts'
      
      const promise = fetch(url,{
        method: 'GET',
        headers:{
          'Content-type': 'application/json'
        }
      });

      const jsonPromise = promise.then((response) => {
        return response.json();         
      })
      
      jsonPromise.then(body => {
          this.setState({
            postsArray: body.all.map(obiect => {
              return this.generateObject(obiect)
            })
          });
      })
    }

    componentDidMount() {
      this.onPosts();
    }

    generateObject(data) {
      const { user = {} } = data;
      const { name = {} } = user;
      const { first = '', last = '' } = name;
      return {
        id: data._id,
        text: data.text,
        userName: {
          first: first,
          last: last
        },
        upVotes: data.upvotes
      }
    }


    render(){
      const firstColumn = this.state.postsArray.filter((post,index) => {
        return (index % 3 === 0); 
      });
      const secondColumn = this.state.postsArray.filter((post,index) => {
        return (index % 3 === 1); 
      });
      const thirdColumn = this.state.postsArray.filter((post,index) => {
        return (index % 3 === 2); 
      });
      
      return (
        <div className="entirePost">
          <ForEachPost allPosts={firstColumn} />  
          <ForEachPost allPosts={secondColumn} />  
          <ForEachPost allPosts={thirdColumn} />  
        </div>
        
      )
    }
  }

  class ForEachPost extends React.Component {
    render() {
      return (
        <div className="column">
          {
            this.props.allPosts.map((x) => (
                <table className="post" key={x.id}>
                  <tbody>
                    <tr>
                      <td>{x.userName.first} {x.userName.last}</td>
                      <td className="upVotes">Up Votes: {x.upVotes}</td>
                    </tr>
                    <tr className="text">
                      <td colSpan="2">{x.text}</td>
                    </tr>
                  </tbody>
                </table>
            ))
          }
        </div>
      )
    }
  }

export default Posts;