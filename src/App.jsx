import React, { Component } from 'react';
import Home from './components/Home/Home';
import FormCreate from './components/FormCreate/FormCreate';
import FormFill from './components/FormFill/FormFill';
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
  submitResponse=(formName, responses) => {
    if (formName.length !== 0 && responses.length !== 0) {
      fetch('/forms/submit', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ formName, responses }),
      })
        .then(response => response.json())
        .then((responseObj) => {
          this.setState({
            currentPage: 'FirstPage',
          });
        });
    }
  }
  submitForm=(formName) => {
    if (formName.length !== 0) {
      fetch(`/forms?formName=${formName}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
      })
        .then(response => response.json())
        .then((responseObj) => {
          this.setState({
            data: { formName, data: responseObj.data },
            currentPage: 'FormFill',
          });
        });
    }
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
        submitForm={this.submitForm}
        data={this.state.data}
      />);
    } else if (this.state.currentPage === 'FormCreate') {
      page = (<FormCreate onClick={this.createForm} />);
    } else if (this.state.currentPage === 'FormFill') {
      page = (<FormFill data={this.state.data} submitResponse={this.submitResponse} />);
    } else if (this.state.currentPage === 'Responses') {
      page = (<Responses data={this.state.data} submitResponse={this.submitResponse} />);
    }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
