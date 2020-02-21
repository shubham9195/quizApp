import React, { Component } from 'react'

export default class Answers extends Component {
    checkAnswer(e){
        let {increaseScore,optionClicked} = this.props;
        optionClicked();
        if(e===this.props.correctAns){
        console.log(true);
         increaseScore();
     } 
     else{
         console.log(false);
     }
        
    }
    render() {
        let { answers } = this.props;
        return (
            <div id="answers">
                <ul>
                    <li onClick={() => this.checkAnswer(answers[0])}><span>1</span> <p>{answers[0]}</p></li>
                    <li onClick={() => this.checkAnswer(answers[1])}><span>2</span> <p>{answers[1]}</p></li>
                    <li onClick={() => this.checkAnswer(answers[2])}><span>3</span> <p>{answers[2]}</p></li>
                    <li onClick={() => this.checkAnswer(answers[3])}><span>4</span> <p>{answers[3]}</p></li>
                </ul>
            </div>
        )
    }
}
