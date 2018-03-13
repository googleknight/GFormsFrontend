import React, { Component } from 'react';
import Home from './components/Home/Home';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'FirstPage',
      data: [],
    };
  }

  render() {
    let page;
    if (this.state.currentPage === 'FirstPage') {
      page = (<Home
        data={this.state.data}
      />);
    }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
