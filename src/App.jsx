import React, { Component } from 'react';
import Home from './components/Home/Home';
import FormCreate from './components/FormCreate/FormCreate';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'FormCreate',
      data: [],
    };
  }
createForm=() => {
  this.setState({
    currentPage: 'FormCreate',
  });
}
render() {
  let page;
  if (this.state.currentPage === 'FirstPage') {
    page = (<Home
      onClick={() => this.createForm()}
      editForm={this.editForm}
      data={this.state.data}
    />);
  } else if (this.state.currentPage === 'FormCreate') {
    page = (<FormCreate />);
  }
  return (
    <div className="App">
      {page}
    </div>
  );
}
}

export default App;
