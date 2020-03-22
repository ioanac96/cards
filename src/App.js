import React from 'react';
import fetch from 'axios'
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: '',
      currentCard: '',
      cards: [],
      remaining: 1,
      sum: 0

    };

    this.onShuffle = this.onShuffle.bind(this);
    this.onDraw = this.onDraw.bind(this);
  }

   realValue (valueOfCurrentCard) {
    
        if(valueOfCurrentCard === '0') { return 10;}
          else if (valueOfCurrentCard === 'J') { return 11;}
            else if (valueOfCurrentCard === 'Q') { return 12;}
              else if (valueOfCurrentCard === 'K') { return 13;}
               else if (valueOfCurrentCard === 'A') { return 1;}
                else {
                  return  valueOfCurrentCard[0] * 1;
                }
      
    
  }

  generateObject(data) {
    const card = data.cards[0];
    return {
      image: card.image,
      code: card.code,
      value: this.realValue(card.code[0])
    }
  }


  onShuffle() {
    console.log('shuffle');
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    this.setState({
      deckId: '',
      currentCard: '',
      cards: [],
      remaining: 1
    });

    const promise = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    promise.then((response) => {
      if (response.status === 200) {
        const deckId = response.data.deck_id;
        this.setState({
          deckId: deckId
        });
      }
    });
  }

  onDraw() {
    const url ='https://deckofcardsapi.com/api/deck/'+ this.state.deckId +'/draw/?count=1'
    const promise = fetch(url, {
      method: 'GET',
      eaders: {
        'Content-Type': 'application/json'
      }
    });
    
    promise.then((response) => {
      console.log('Response:',response);
      if(response.status === 200) { 
        const cards= Object.assign([], this.state.cards);
        const currentCard = this.generateObject(response.data);
        cards.push(currentCard);
       
      
        // console.log('Show me:', response.data.cards[0].code[0]);
        // let sum = this.state.sum;
        // sum = sum + this.realValue(response.data.cards[0].code[0]);
        // console.log(sum);
          
        const remaining = response.data.remaining;
        
        this.setState({
          currentCard: currentCard,
          cards: cards,
          remaining: remaining,
          // sum: sum

        }); 
      } 

    });
  }



  render() {
    const verify = this.state.deckId !== '';
    const cardsLeft = this.state.remaining !== 0;
    let sum = 0;
    this.state.cards.forEach((x) => {
      sum = sum + x.value;
    });
    console.log(this.state.cards);
    console.log('My sum is:',sum);
    return (
      <div className="App">
        <h1>Deck of cards</h1>
        <button onClick={this.onShuffle}>Shuffle a new deck</button>
        <div>
          {
            (verify && cardsLeft) ? 
              <div>
                <button onClick={this.onDraw}>Draw a card</button>
                <div> <img src={this.state.currentCard.image} /> </div> 
              </div> : null
          }
        </div>
        <ShowCards allCards={this.state.cards} />
  
      </div>
    ); 
  }
}

class ShowCards extends React.Component {
  render() {
    return (
      <div>
        { 
          this.props.allCards.map((x) => (
            console.log(x.image),
            <img src={x.image}/>
          ))
        }
      </div>
     
    )
  }
}

export default App;
