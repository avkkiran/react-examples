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
      <div class="row">
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

class App extends React.Component {
  render() {
    return (
      <div>
          <Game />
    </div>
  );
}
}

ReactDOM.render(<App />, mountNode);