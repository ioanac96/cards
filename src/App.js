import React from 'react';
import fetch from 'axios'
import logo from './logo.svg';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: '',
      cards: [],
      computerCards: [],
      playerStopped: false,
      computerStopped: false,
      isMobile: window.innerWidth < 900
    };

    this.onShuffle = this.onShuffle.bind(this);
    this.onDrawForPlayer = this.onDrawForPlayer.bind(this);
    this.realValue = this.realValue.bind(this);
    this.clickStop = this.clickStop.bind(this);
    this.computerMoves = this.computerMoves.bind(this);
    this.getCard = this.getCard.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  
  clickStop(){
    this.setState({
      playerStopped: true
    });
    this.computerMoves();
  }

   realValue (valueOfCurrentCard) {
    
        if(valueOfCurrentCard === '0') { return 10;}
          else if (valueOfCurrentCard === 'J' || valueOfCurrentCard === 'Q' || valueOfCurrentCard === 'K') { return 10;}
               else if (valueOfCurrentCard === 'A') { return 11;}
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
      cards: [],
      computerCards: [],
      playerStopped: false,
      computerStopped: false,
      isMobile: window.innerWidth < 900

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

  getCard() {
    const url ='https://deckofcardsapi.com/api/deck/'+ this.state.deckId +'/draw/?count=1'
    const promise = fetch(url, {
      method: 'GET',
      eaders: {
        'Content-Type': 'application/json'
      }
    });
    return new Promise((resolve, reject) => {
      promise.then((response) => {
        if(response.status === 200)
          resolve(this.generateObject(response.data));
      });
    })
  }

  onDrawForPlayer() {
    this.getCard().then((currentCard) => {
   
      const cards= Object.assign([], this.state.cards);
      cards.push(currentCard);
      
      this.setState({
        cards: cards,
      }); 
    });
  }

  computerMoves() {
    this.getCard().then((currentCard) => {
   
      const cards= Object.assign([], this.state.computerCards);
      cards.push(currentCard);
      const sum = this.cardsSum(cards);
      if (sum > 14) {
        this.setState({
          computerStopped: true
        });
      }
      else this.computerMoves();
      
      this.setState({
        computerCards: cards,
      }); 
    });

  }

  cardsSum(cardsArray) {
    let sum = 0;
    cardsArray.forEach((x) => {
      sum = sum + x.value;
   });

   cardsArray.forEach((x) => {
     if(x.value === 11 && sum > 21)
       sum = sum - 10;
   });
   return sum;
  }

  renderMobile() {
    return <div>Mobile version!</div>
  }

  onResize() {
    const isMobile = window.innerWidth < 900;
    if(isMobile !== this.state.isMobile){
      this.setState({
        isMobile: isMobile
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }


  render() {
    if(this.state.isMobile) return this.renderMobile();
    const verify = this.state.deckId !== '';
    const playerSum = this.cardsSum(this.state.cards);
    const computerSum = this.cardsSum(this.state.computerCards);
    let result = '';
    if(this.state.computerStopped && this.state.playerStopped){
      if(playerSum > computerSum && playerSum <= 21) result = 'Player won!';
        else if(playerSum > computerSum && playerSum > 21) result = 'Computer won!';
         else if(playerSum < computerSum && computerSum <= 21) result = 'Computer won!';
          else if(playerSum < computerSum && computerSum > 21) result = 'Player won!';
            else if(playerSum === computerSum || (computerSum > 21 && playerSum > 21)) result = 'It is equality!';
    }
    
    console.log(this.state.cards);
    console.log('My sum is:', playerSum);
    return (
      <div className="App">
        <h1>BlackJack</h1>
        <button onClick={this.onShuffle}>Start a new game</button>
        <button onClick={() => {window.removeEventListener('resize', this.onResize);}}>Stop resize</button>
        {
          (verify) ? 
            <div>
              <button onClick={this.onDrawForPlayer} disabled={playerSum > 21 || this.state.playerStopped}>Draw a card</button>
              <button onClick={this.clickStop} disabled={this.state.playerStopped}>Stop</button>
    
            </div> : null
        }
        <div>{playerSum}</div>
        <ShowCards allCards={this.state.cards} />
      
        {
          this.state.playerStopped ? 
          <div>
            <div>Computer sum: {computerSum}</div>
            <ShowCards allCards={this.state.computerCards} />
          </div> : null
        }
        <div>{result}</div>
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
