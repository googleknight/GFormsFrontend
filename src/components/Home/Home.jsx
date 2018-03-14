import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const forms = this.state.data.map((form, index) => (
      <div className="Home-Form-Container" key={rand.generate(5)}>
        <button
          className="Home-Form-button"
          type="button"
          onClick={() => this.props.submitForm(form.DISTINCT)}
        >{form.DISTINCT}
        </button>
        <div
          tabIndex={index}
          role="button"
          onKeyPress={() => this.props.getResponses(form.DISTINCT)}
          className="Home-Form-text"
          onClick={() => this.props.getResponses(form.DISTINCT)}
        >
         RESPONSES
        </div>
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


Home.propTypes = {
  onClick: PropTypes.func,
  submitForm: PropTypes.func,
  getResponses: PropTypes.func,
};

Home.defaultProps = {
  onClick: () => null,
  submitForm: () => null,
  getResponses: () => null,
};


export default Home;
