import React, { Component } from 'react';
import './Home.css';

const rand = require('random-key');


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch('/forms/formNames', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then((responseObj) => {
        this.setState({
          data: responseObj.data,
        });
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  render() {
    const forms = this.state.data.map(form => (
      <div className="Home-Form-Container" key={rand.generate(5)}>
        <button
          className="Home-Form-button"
          type="button"
          onClick={() => this.props.submitForm(form.DISTINCT)}
        >{form.DISTINCT}
        </button>
        <p className="Home-Form-text">RESPONSES</p>
      </div>
    ));
    return (
      <div className="Home">
        <div className="Home-header">
          <button
            className="Home-create-button"
            onClick={() => this.props.onClick()}
            type="button"
          >+
          </button>
          <p className="Home-create-text">
            CREATE FORM
          </p>
        </div>
        <div className="Home-body" >
          <div>
            <p className="Home-body-heading">
            AVAILABLE FORMS
            </p>
          </div>
          <div className="Home-body-forms">
            {forms}
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
