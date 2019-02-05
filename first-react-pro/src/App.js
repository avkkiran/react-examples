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

const Button = (props) => {
  return (
    <div className="col-2">
    <button className="btn" disabled={props.selectedNumbers.length === 0}>
    =
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

class Game extends React.Component {
state = {
  selectedNumbers: [],
randomNumOfStars: 1 + Math.floor(Math.random()*9)
};
selectNumber = (clickedNum) => {
  if(this.state.selectedNumbers.indexOf(clickedNum) >= 0) { return; }
  this.setState(prevState => ({
    selectedNumbers: prevState.selectedNumbers.concat(clickedNum)
}));
};
unselectNumber = (clickedNum) => {
  this.setState(prevState => ({
    selectedNumbers: prevState.selectedNumbers
                                          .filter(num => num !== clickedNum)
}));
};
render() {
  const { selectedNumbers, randomNumOfStars } = this.state;
  return (
    <div className="container">
      <h3>Play Nine</h3>
    <hr />
    <div className="row">
        <Stars numberOfStars={randomNumOfStars} />
      <Button selectedNumbers={selectedNumbers} />
      <Answer selectedNumbers={selectedNumbers} 
                          unselectNumber={this.unselectNumber} />
    </div>
    <br />
    <Numbers selectedNumbers={selectedNumbers} 
                          selectNumber={this.selectNumber} />
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
