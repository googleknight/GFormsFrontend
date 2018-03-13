import React, { Component } from 'react';
import './FormCreate.css';

// const rand = require('random-key');


class FormCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      formName: '',
    };
  }


  onRequiredChange=(event, index) => {
    const { questions } = this.state;
    const tempQuestion = questions[index];
    questions[index] = {
      question: tempQuestion.question,
      type: tempQuestion.type,
      required: event.target.checked,
    };
    this.setState({ questions });
  }

  onOptionChange=(event, index) => {
    const { questions } = this.state;
    const tempQuestion = questions[index];
    questions[index] = {
      question: tempQuestion.question,
      type: event.target.value,
      required: tempQuestion.required,
    };
    this.setState({ questions });
  }
  getFormName=(event) => {
    this.setState({ formName: event.target.value });
  }
  getQuestion=(event, index) => {
    const { questions } = this.state;
    const tempQuestion = questions[index];
    questions[index] = {
      question: event.target.value,
      type: tempQuestion.type,
      required: tempQuestion.required,
    };
    this.setState({ questions });
  }
  deleteQuestion=(index) => {
    let { questions } = this.state;
    questions = questions.filter((item, idx) => idx !== index);
    this.setState({ questions });
  }
  addQuestion=() => {
    const { questions } = this.state;
    const questionDetail = {
      question: '',
      type: 'Date',
      required: false,
    };
    questions.push(questionDetail);
    this.setState({ questions });
  }
  generateComponent=() => this.state.questions.map((questionDetail, index) =>
    (
      <div className="Question" key={index} >
        <div className="Question-input-area">
          <input
            className="Question-input"
            type="input"
            onChange={event => this.getQuestion(event, index)}
            value={questionDetail.question}
          />
          <div className="styled" >
            <select onChange={event => this.onOptionChange(event, index)}>
              <option checked>Date</option>
              <option>Short answer</option>
              <option>Paragraph</option>
            </select>
          </div>
        </div>
        <div className="Question-lower">
          <hr />
          <div className="Question-options">
            <div
              tabIndex={index}
              role="button"
              onKeyPress={() => this.deleteQuestion(index)}
              className="Question-delete-button"
              onClick={() => this.deleteQuestion(index)}
            >
              <i className="material-icons">delete</i>
            </div>
            <input
              type="checkbox"
              name="required"
              value="required"
              onChange={event => this.onRequiredChange(event, index)}
            />Required
          </div>
        </div>
      </div>
    ))

  render() {
    const renderme = this.generateComponent();
    return (
      <div className="FormCreate">
        <div className="FormCreate-header" />
        <div className="FormCreate-body" >
          <div className="FormCreate-Main-Box">
            <button
              className="FormCreate-submit-button"
              onClick={() => this.props.onClick(this.state.formName, this.state.questions)}
              type="button"
            >SUBMIT
            </button>
            <input
              className="FormCreate-form-input"
              type="input"
              onChange={event => this.getFormName(event)}
            />
            <div className="FormCreate-button-container" >
              <button
                className="FormCreate-create-button"
                onClick={() => this.addQuestion()}
                type="button"
              >+
              </button>
            </div>
          </div>
          <div>
            {renderme}
          </div>
        </div>
      </div>
    );
  }
}

export default FormCreate;
