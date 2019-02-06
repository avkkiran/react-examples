import React, { Component } from 'react';
import './App.css';
import _ from "lodash";

// import axios from 'axios';

// const Card = (props) => {
// 	return (
//   	<div style={{margin: '1em'}}>
//     	<img width="75" src={props.avatar_url} alt="placeholder" />

// 			<div style={{display: 'inline-block', marginLeft: 10}}>
//     		<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
//         	{props.name}
//         </div>
//       	<div>{props.location}</div>
//       </div>
//     </div>
//   );
// };

// const CardList = (props) => {
// 	return (
//   	<div>
//     	{props.cards.map(card => <Card key={card.id} {...card} />)}
//     </div>
//   );
// }

// class Form extends React.Component {
// 	state = { userName: ''}
// 	handleSubmit = async (event) => {
//   	event.preventDefault();
//     // console.log('Event: Form submit', this.state.userName);
//     // let resp = await fetch(`https://api.github.com/users/${this.state.userName}`);
//     let resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
//     this.props.onSubmit(resp.data);
//     this.setState({ userName: ''});
//   };
// 	render() {
//   	return (
//     	<div>
//       	<form onSubmit={this.handleSubmit}>
//           <input type="text" 
//           	// ref={(input) => this.usernameInput = input}
//             value={this.state.userName}
//             onChange={(event) => this.setState({userName: event.target.value})}
//           	placeholder="Github username" />
//           <button type="submit">Add Card</button>
//         </form>
//       </div>
//     );
//   }
// }


var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Button = (props) => {
  let button;
  switch(props.answerIsCorrect) {
    case true:
      button = 
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check" />
        </button>;
      break;
    case false:
    button = 
    <button className="btn btn-danger">
      <i className="fa fa-times" />
    </button>;
      break;
    default:
      button = 
      <button className="btn" disabled={props.selectedNumbers.length === 0}
          onClick={props.checkAnswer}>
        =
      </button>;
      break;
  }
  return (
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redraws === 0}>
        <i className="fa fa-refresh" /> {props.redraws}
      </button>
    </div>
  );
};

const Answer = (props) => {
return (
  <div className="col-5">
    {props.selectedNumbers.map((num,i) => 
      <span key={i} onClick={() => props.unselectNumber(num)}>
      {num}
      </span>
  )}
</div>
);
};

const Stars = (props) => {
return (
  <div className="col-5">
    {_.range(props.numberOfStars).map(i => 
      <i key={i} className="fa fa-star" />
  )}
</div>
);
};

const Numbers = (props) => {
  const numberClassName = (number) => {
    if(props.selectedNumbers.indexOf(number) >= 0) {
        return 'selected';
    }
    if(props.usedNumbers.indexOf(number) >= 0) {
        return 'used';
    }
  };
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((num,i) => 
          <span key={i} className={numberClassName(num)}
                    onClick={() => props.selectNumber(num)}>
          {num}
        </span>
      )}
    </div>
  </div>
  );
};

Numbers.list = _.range(1,10);

const DoneFrame = (props) => {
  return (
    <div className="text-center">
        <h2>{props.doneStatus}</h2>
        <button className="btn btn-secondary" onClick={props.resetGame}>
          Play Again
        </button>
    </div>
  );
};

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers: [],
    usedNumbers: [],
    randomNumOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null
  });
  state = Game.initialState();
  resetGame = () => this.setState(Game.initialState());
  selectNumber = (clickedNum) => {
    if(this.state.selectedNumbers.indexOf(clickedNum) >= 0) { return; }
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNum)
    }));
  };
  unselectNumber = (clickedNum) => {
    this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers
                                              .filter(num => num !== clickedNum)
    }));
  };
  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumOfStars === 
        prevState.selectedNumbers.reduce((acc, n) => acc+n, 0)
    }));
  };
  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      answerIsCorrect: null,
      selectedNumbers: [],
      randomNumOfStars: Game.randomNumber()
    }), this.updateDoneStatus);
  };
  redraw = () => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: [],
      randomNumOfStars: Game.randomNumber(),
      redraws: prevState.redraws-1
    }), this.updateDoneStatus);
  };
  possibleSolutions = ({ randomNumOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1,10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, randomNumOfStars);
  };
  updateDoneStatus = () => {
    this.setState(prevState => {
      if(prevState.usedNumbers.length === 9) {
        return { doneStatus: "Good! Nice"};
      }
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: "Game Over!"}
      }
    });
  }
  render() {
    const { 
      selectedNumbers, 
      usedNumbers, 
      randomNumOfStars, 
      answerIsCorrect,
      redraws,
      doneStatus
    } = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
      <hr />
      <div className="row">
        <Stars numberOfStars={randomNumOfStars} />
        <Button selectedNumbers={selectedNumbers} 
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  redraws={redraws}
            />
        <Answer selectedNumbers={selectedNumbers} 
                            unselectNumber={this.unselectNumber} />
      </div>
      <br />
      {doneStatus ? 
          <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} />
          : 
          <Numbers selectedNumbers={selectedNumbers} 
                usedNumbers={usedNumbers}
                            selectNumber={this.selectNumber} />
      }
    </div>
  );
  }
}

class App extends Component {
  // state = {
  // 	cards: []
  // };
  
  // addNewCard = (cardInfo) => {
  // 	this.setState(prevState => ({
  //   	cards: prevState.cards.concat(cardInfo)
  //   }));
  // }
  render() {
    return (
      // <div className="App">
      //   <Form onSubmit={this.addNewCard} />
      //   <CardList cards={this.state.cards} />
      // </div>
      <div className="App">
    		<Game />
      </div>
    );
  }
}

export default App;
