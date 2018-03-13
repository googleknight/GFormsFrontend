import React, { Component } from 'react';
import './FormFill.css';

// const rand = require('random-key');


class FormFill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
      formName: props.data.formName,
    };
  }

  getResponse=(event, index, question) => {
    const { responses } = this.state;
    responses[index] = {
      formName: this.state.formName,
      question,
      response: event.target.value,
    };
    this.setState({ responses });
  }


getInputType=(type) => {
  if (type === 'Date') {
    return 'date';
  } else if (type === 'Short answer') {
    return 'text';
  }
  return 'none';
}
getInputArea=(type, required, index, question) => {
  if (type !== 'Paragraph') {
    return (<input
      className="Question-input"
      type={this.getInputType(type)}
      required={required}
      onChange={event => this.getResponse(event, index, question)}
    />);
  }
  return (<textarea
    className="Question-input"
    required={required}
    rows="2"
    column="60"
    onChange={event => this.getResponse(event, index, question)}
  />);
}
validate=() => {
  let flag = 1;
  this.props.data.data.forEach((question, index) => {
    if (question.required === true && this.state.responses[index] === undefined) {
      flag = 0;
      alert('Please fill all the required entries');
    }
  });
  if (flag === 1) { this.props.submitResponse(this.state.formName, this.state.responses); }
}
// TODO write a validate method to validate req fields
render() {
  const questions = this.props.data.data.map((question, index) => (
    <div className="Question-container" key={index}>
      <p className="Question-statement">
        {question.question}
      </p>
      {this.getInputArea(question.type, question.required, index, question.question)}
    </div>
  ));
  return (
    <div className="FormFill">
      <div className="FormFill-header" />
      <div className="FormFill-body" >
        <div className="FormFill-Main-Box" >
          <p className="FormFill-title">{this.state.formName}</p>
          <form>
            <div className="FormFill-questions-container">
              {questions}
            </div>
            <button
              className="Formfill-submit-button"
              onClick={() => this.validate()}
              type="button"
            >SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
}

export default FormFill;
