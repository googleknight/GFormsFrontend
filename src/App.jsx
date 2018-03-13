import React, { Component } from 'react';
import Home from './components/Home/Home';
import FormCreate from './components/FormCreate/FormCreate';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'FirstPage',
      data: [],
    };
  }
  goToFormCreate=() => {
    this.setState({
      currentPage: 'FormCreate',
    });
  }
  createForm=(formName, questions) => {
    if (formName.length !== 0 && questions.length !== 0) {
      fetch('/forms/new', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ formName, questions }),
      })
        .then(response => response.json())
        .then((responseObj) => {
          this.setState({
            currentPage: 'FirstPage',
          });
        });
    }
  }
  render() {
    let page;
    if (this.state.currentPage === 'FirstPage') {
      page = (<Home
        onClick={() => this.goToFormCreate()}
        editForm={this.editForm}
        data={this.state.data}
      />);
    } else if (this.state.currentPage === 'FormCreate') {
      page = (<FormCreate onClick={this.createForm} />);
    }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
