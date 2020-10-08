import React from 'react';
import Modal from 'react-modal'
import './style/App.css';
import Overview from './img/Computer Science - An Overview.jpg'
import Logic from './img/Introducing Logic.jpg'
import SuperIntelligence from './img/SuperIntelligence.jpg'
import Algorithms from './img/Algorithms To Live By.jpg'
import Ticket from './img/Golden Ticket.jpg'
import Design from './img/Mind Design II.jpg'
import Washington from './img/head-washington.gif'

/** Global Variables! */

class App extends React.Component {
  render(){
    return (
      <div className="App" style={{height: window.innerHeight}}>
        <Intro/>
        <div className="main-section" style={{height: 0.75 * window.innerHeight}}>
          <BookList/>
        </div>
        <BookPopUp/>
      </div>
    );
  }
}

function Menu(){
  return(
    <div className="Menu">
      <div className="menu-item"> HOME </div>
      <div className="menu-item"> BOOKS </div>
      <div className="menu-item"> QUIZ </div>
    </div>
  )
}

function Intro(){
  return(
    <div>
      <div style={{position: 'relative'}}>
        <img src={Washington} className='logo'/>  
        <h1 className="main-heading">
          DAWN OF KNOWLEDGE
        </h1>
      </div>
    </div>
  )
}

class BookList extends React.Component{

  state = {
    display: true
  }

  switchToQuiz = () => {
    this.setState({display: false})
  }

  switchToList = () => {
    this.setState({display: true})
  }

  render(){
    if(this.state.display){
      return(
        <div style={{display: this.state.display}}>
          <BookItem
            img={Overview}
            title={'Computer Science: An Overview'}
            description={'This book presents an introductory survey of computer science.'}
            quiz={this.switchToQuiz}
          />
          <BookItem
            img={Logic}
            title={'Introducing Logic'}
            description={'Logic is the backbone of Western civilization, holding together its systems of philosophy, science and law.'}
            quiz={this.switchToQuiz}
          />
          <BookItem 
            img={SuperIntelligence}
            title={'Superintelligence'}
            description={'New superintelligence could replace humans as the dominant lifeform on Earth.'}
            quiz={this.switchToQuiz}
          />
          <BookItem
            img={Algorithms}
            title={'Algorithms To Live By'}
            description={'A fascinating exploration of how computer algorithms can be applied to our everyday lives.'}
            quiz={this.switchToQuiz}
          />
          <BookItem
            img={Ticket}
            title={'Golden Ticket'}
            description={'Provides a nontechnical introduction to P-NP, its rich history, and its algorithmic implications'}
            quiz={this.switchToQuiz}
          />
          <BookItem
            img={Design}
            title={'Mind Design II'} 
            description={'Mind design is the endeavor to understand mind (thinking, intellect) in terms of its design (how it is built, how it works).'}
            quiz={this.switchToQuiz}
          />
        </div>
      )
    }else{
      return(
        <Quiz list={this.switchToList}/>
      )
    }
  }  
}

class Quiz extends React.Component{
  constructor(props){
    super(props)
    this.questions = [
      {
        "book":"Computer Science: An Overview",
        "topic":"0.1 The Role of Algorithms",
        "question":"What is an algorithm?",
        "answers":[
          "a process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.",
          "a set of rules governing the exchange or transmission of data between devices.",
          "a story, poem, or picture that can be interpreted to reveal a hidden meaning, typically a moral or political one."
        ],
        "correct":0
      }
    ]
  }

  componentDidMount(){
      fetch(`/quiz.json`)
        .then(res => res.json())
          .then(res => this.questions = res)
            .then(this.setState({display: 'block'}))
  }

  nextQuestion = () => {
    let correctNumber = this.state.correctNumber
    if (this.state.selected == null){
      console.log("select an answer")
    }else{
      console.log(this.state.selected, this.questions[this.state.currentQuestion].correct)
      correctNumber = this.questions[this.state.currentQuestion].correct == this.state.selected ? this.state.correctNumber+1 : this.state.correctNumber 

      if(this.state.currentQuestion != this.questions.length - 1){
        this.setState({currentQuestion: this.state.currentQuestion + 1, correctNumber: correctNumber})
      }else{
        this.setState({resultsScreen: true, correctNumber: correctNumber})
      }
    }
  }

  changeSelected = (i) => {
    this.setState({selected: i}, console.log(this.state.selected))
  }

  state = {
    currentQuestion: 0,
    correctNumber: 0,
    selected: null,
    resultsScreen: false,
    display: 'none'
  }

  render(){
    if (!this.state.resultsScreen && this.state.display != 'none'){
      return(
        <div style={{width: '80%'}}>
          <p style={{textAlign: 'left', margin: 0, marginTop: 5}}>Question {this.state.currentQuestion + 1}</p>
          <p style={{textAlign: 'left', margin: 0}}>{this.questions[this.state.currentQuestion].topic}</p>
          <h2 id="question-title">{this.questions[this.state.currentQuestion].question}</h2>
          <ul style={{paddingLeft: 7.5}}>
            <AnswerOption
              onAnswerSelected={() => this.changeSelected(0)}
              answerContent={this.questions[this.state.currentQuestion].answers[0]}
            />
            <AnswerOption
              onAnswerSelected={() => this.changeSelected(1)}
              answerContent={this.questions[this.state.currentQuestion].answers[1]}
            />
            <AnswerOption
              onAnswerSelected={() => this.changeSelected(2)}
              answerContent={this.questions[this.state.currentQuestion].answers[2]}
            />
          </ul>
          <button onClick={this.nextQuestion}> Next </button>
        </div>
      )
    }else{
      console.log("Score", this.state.correctNumber)
      return(
        <div>
            <h2 style={{textAlign: 'center', margin: 0, marginTop: 5}}>
              You scored {this.state.correctNumber} out of {this.questions.length}
            </h2>
            <button onClick={this.props.list}>
              Back
            </button>
        </div>
      )
    }
  }
}

class AnswerOption extends React.Component{
  state = {
    checked: false
  }

  checkMe = () => {
    this.props.onAnswerSelected()
  }

  render(){
    return(
      <li className="answer-option">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          onClick={this.checkMe}
        />
        <label className="radio-label" htmlFor={this.props.answerType}>
          <br/>{this.props.answerContent}
        </label>
      </li>
    )
  }
}

class BookItem extends React.Component{
  state = {
    itemHeight: 100,
    buttonDisplay: 'none',
    buttonOpacity: 0,
  }

  expand = () => {
    if (this.state.itemHeight === '150px'){
      this.setState({itemHeight: '100px', buttonDisplay: 'none', buttonOpacity: 0})
    }else{
      this.setState({itemHeight: '150px', buttonDisplay: 'flex', buttonOpacity: 1})
    }
  }

  onTouch = (e) => {
    if(e.target.className == 'btn-main'){
      this.props.quiz()
    }else{
      this.expand()
    }
  }

  render(){
    return(
      <div className="item" onClick={e => this.onTouch(e)}>
        <div style={{display: 'flex', height: this.state.itemHeight, overflowY: 'hidden', transition: '2s'}}>
          <img src={this.props.img} className='item-img' alt={this.props.title}/>
          <div style={{alignSelf: 'center', width: '100%', padding: '5px'}}>
            <h3 className='item-title m-0'>{this.props.title}</h3>
            <p className='item-description m-0'>{this.props.description}</p>
            <div style={{
                  positon: 'absolute',
                  display: this.state.buttonDisplay,
                  justifyContent: 'space-around',
                  marginTop: '10px',
            }}>
              <div className="btn-main">
                Description
              </div>
              <div className="btn-main" onClick={e => this.onTouch(e)}>
                Quiz
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function BookPopUp(props){
  return(
    <Modal className='book-popup'>
      <img src={props.img} alt={props.title}/>
      <p className='item-description m-0'>{props.description}</p>
    </Modal>
  )
}

export default App;
