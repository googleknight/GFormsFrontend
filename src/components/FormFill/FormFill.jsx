import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormFill.css';

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
      placeholder="Your answer"
      onChange={event => this.getResponse(event, index, question)}
    />);
  }
  return (<textarea
    className="Question-input"
    required={required}
    rows="2"
    column="220"
    placeholder="Your answer"
    onChange={event => this.getResponse(event, index, question)}
  />);
}
getQuestionStatement=(question, required) => {
  if (required) { return `${question} *`; }
  return question;
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

render() {
  const questions = this.props.data.data.map((question, index) => (
    <div className="Question-container" key={index}>
      <p className="Question-statement">
        {this.getQuestionStatement(question.question, question.required)}
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
FormFill.propTypes = {
  data: PropTypes.shape({
    formName: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      type: PropTypes.string,
      required: PropTypes.string,
    })),
  }),
  submitResponse: PropTypes.func,
};

FormFill.defaultProps = {
  data: null,
  submitResponse: () => null,
};


export default FormFill;
