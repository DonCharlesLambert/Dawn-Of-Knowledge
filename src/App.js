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

function App() {
  return (
    <div className="App" style={{height: window.innerHeight}}>
      <Intro/>
      <QuizList/>
      <BookPopUp/>
    </div>
  );
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

function QuizList(props){
  return(
    <div className="quiz-list" style={{height: 0.75 * window.innerHeight}}>
      <QuizItem
        img={Overview}
        title={'Computer Science: An Overview'}
        description={'This book presents an introductory survey of computer science.'}
      />
      <QuizItem
        img={Logic}
        title={'Introducing Logic'}
        description={'Logic is the backbone of Western civilization, holding together its systems of philosophy, science and law.'}
      />
      <QuizItem 
        img={SuperIntelligence}
        title={'Superintelligence'}
        description={'New superintelligence could replace humans as the dominant lifeform on Earth.'}
      />
      <QuizItem
        img={Algorithms}
        title={'Algorithms To Live By'}
        description={'A fascinating exploration of how computer algorithms can be applied to our everyday lives.'}
      />
      <QuizItem
        img={Ticket}
        title={'Golden Ticket'}
        description={'Provides a nontechnical introduction to P-NP, its rich history, and its algorithmic implications'}
      />
      <QuizItem
        img={Design}
        title={'Mind Design II'} 
        description={'Mind design is the endeavor to understand mind (thinking, intellect) in terms of its design (how it is built, how it works).'}
      />
    </div>
  )
}

class QuizItem extends React.Component{
  state = {
    itemHeight: 100,
    expand: 0,
  }

  expand = () => {
    if (this.state.itemHeight === '200px'){
      this.setState({itemHeight: '100px', expand: 0})
    }else{
      this.setState({itemHeight: '200px', expand: 1})
    }
  }

  render(){
    return(
      <div className="item" style={{height: this.state.itemHeight, transition: '2s'}} onClick={this.expand}>
        <div style={{display: 'flex', height: '100px'}}>
          <img src={this.props.img} style={{transition: '2s'}} className='item-img' alt={this.props.title}/>
          <div style={{alignSelf: 'center', width: '100%', padding: '5px'}}>
            <h3 className='item-title m-0'>{this.props.title}</h3>
            <p className='item-description m-0'>{this.props.description}</p>
          </div>
        </div>
        <div style={{positon: 'absolute', borderTop: 'solid 2px gray', display: 'flex', opacity: this.state.expand, transition: '2s', justifyContent: 'space-around'}}>
          <div className="btn-main">
            Description
          </div>
          <div className="btn-main">
            Quiz
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
