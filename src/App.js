import React, { Component } from 'react';
import Answers from './components/answer'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      nr: 0,
      question: [],
      options: [],
      score: 0,
      correct: []
    }
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    this.handleClick = this.handleClick.bind(this);


  }
  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(
        (result) => {
          let option = result.results[this.state.nr].incorrect_answers
          let random = Math.floor(Math.random() * 4)
          option.splice(random, 0, result.results[this.state.nr].correct_answer)
          let correct = result.results[this.state.nr].correct_answer
          console.log("check kro", correct);

          this.setState({
            data: result.results,
            nr: this.state.nr + 1,
            isLoaded: true,
            question: result.results[this.state.nr].question,
            options: option,
            correct: correct
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  handleIncreaseScore() {
    this.setState({
      score: this.state.score + 1
    });
  }
  handleClick() {
    console.log("nr check", this.state.data);
    let option = this.state.data[this.state.nr].incorrect_answers
    let random = Math.floor(Math.random() * 4)
    option.splice(random, 0, this.state.data[this.state.nr].correct_answer)
    let correct = this.state.data[this.state.nr].correct_answer

    this.setState({
      nr: this.state.nr + 1,
      question: this.state.data[this.state.nr].question,
      options: option,
      correct: correct
    })
  }
  render() {
    console.log("checkdata", this.state.data);
    console.log("checkdataoption", this.state.score);
    console.log("correctans", this.state.data.correct_answer);
    const { error, isLoaded, data, nr, question } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.nr === this.state.data.length) {
      return (<div className="container">
        <h1 style={{ color: "#fff" }}>Quiz Completed</h1>
        <h3 style={{ color: "#fff" }}>Thank You!</h3>
        <h4 style={{ color: "#fff" }}>Score:{this.state.score}</h4>
      </div>)
    } else {
      return (
        <div className="container">
          {/* <h4 style={{color:'#fff'}}>Score:{this.state.score}</h4> */}
          <div className="heading">
            <p style={{ color: '#fff' }}>Round {nr}/{data.length}</p>
            <div className="question">
              <h3>{question}</h3>
            </div>
            <Answers answers={this.state.options} correctAns={this.state.correct} optionClicked={this.handleClick} increaseScore={this.handleIncreaseScore} />
          </div>
        </div>
      );
    }
  }
}

export default App;