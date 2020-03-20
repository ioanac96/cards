import React from 'react';
import logo from './logo.svg';
import './App.css';


class AddForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      imageUrl: ''
    }

    this.onClick = this.onClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  onClick() {
    const post = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.imageUrl
    };
    this.props.onAdd(post);
  }
  
  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleImageChange(event) {
    this.setState({
      imageUrl: event.target.value
    });
  }

  render () {
    // this.props.onAdd should be called when click on submit
    return (
      <div className = 'form'>
        <div className = 'one'>
          <input placeholder = 'Title' type = 'text' value = {this.state.title} onChange = {this.handleTitleChange} />
        </div>
        <div className = 'two'> 
          <textarea placeholder = 'Description' type = 'text' value = {this.state.description} onChange = {this.handleDescriptionChange}></textarea>
        </div>
        <div className= 'three'>
          <input placeholder = 'Image Url' type = 'text' value ={this.state.imageUrl} onChange = {this.handleImageChange}></input>
        </div>
        <div>
          <button onClick={this.onClick}>Submit</button>
        </div>
      </div>

    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsArray: [{
        title: 'Obraznicul obraznicilor',
        description: 'Cel mai obraznic dintre pamanteni.',
        url: 'https://www.animalzoo.ro/wp-content/uploads/2017/05/cu11.jpg'
      },
      {
        title: 'Adormitul adormitilor',
        description: 'Cel mai adormit din lumea asta mare.',
        url: 'https://images.megapixl.com/5784/57840756.jpg'
      },
      {
        title: 'Iubibilul iubitilor',
        description: 'Cel mai iubibil caine din univers.',
        url: 'https://images.unsplash.com/photo-1551408687-4fa2bd0b683a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
      }
    ]
    }

    this.onAddPost = this.onAddPost.bind(this);
    this.handleClickOnDelete = this.handleClickOnDelete.bind(this);
  }

  onAddPost(post) {
    /* post should look like
    {
      title: 'Titlu',
      description: 'Descrierere',
      url: ''
    }
    */
    const copyArray = Object.assign([], this.state.postsArray);
    copyArray.push(post);
    this.setState({
      postsArray: copyArray

    });
    
    console.log('a post was added');
    console.log(post);
  }

  handleClickOnDelete(index) {
    console.log(index)
    const newArray = Object.assign([], this.state.postsArray);
    newArray.splice(index, 1);
    this.setState({
      postsArray: newArray
    });
  }

  render() {
    return (
      <div className="App">
        <h1>DayFive</h1>
        <AddForm onAdd={this.onAddPost} />

        <div>
          <Posts listOfPosts={this.state.postsArray} onDelete={this.handleClickOnDelete}/>
        </div>
      </div>
    ); 
  }
}

class Posts extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        {this.props.listOfPosts.map((x, index) => (
          <Post postInfo={x} index={index} onDelete={this.props.onDelete}/>
        ))}
      </div>
    );
  }
}

class Post extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.postInfo.title}</h2>
        <div>{this.props.postInfo.description}</div>
        <img src={this.props.postInfo.url} />
        <div>
            <button onClick={() => {this.props.onDelete(this.props.index)}}>Delete</button>
        </div>
      </div>

    );
  }
  
}



export default App;
