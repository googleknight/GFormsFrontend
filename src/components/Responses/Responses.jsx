import React, { Component } from 'react';
import './Responses.css';

const rand = require('random-key');


class Responses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
      formName: props.data.formName,
    };
  }

  getResponses=responses => responses.map((response, index) =>
    (
      <p
        className={index % 2 === 0 ? 'Response-even' : 'Response-odd'}
        key={rand.generate(5)}
      >
        {response}
      </p>
    ))


  render() {
    const questions = this.props.data.data.map(question => (
      <div className="Question-container" key={rand.generate(5)}>
        <p className="Question-statement">
          {question.question}
        </p>
        <p className="Question-heading-message">
      Last 7 responses
        </p>
        <div className="Question-responses">
          {this.getResponses(question.responses)}
        </div>
      </div>
    ));
    return (
      <div className="Responses">
        <div className="Responses-header" />
        <div className="Responses-body" >
          <div className="Responses-Main-Box" >
            <p className="Responses-title">{this.state.formName}</p>
            <div className="Responses-questions-container">
              {questions}
            </div>
            <button
              className="Responses-submit-button"
              onClick={() => this.props.onClick()}
              type="button"
            >Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Responses;
