import React, { Component } from 'react';
import './FormCreate.css';

const rand = require('random-key');


class FormCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      formName: '',
    };
  }
  getFormName=(event) => {
    this.setState({ formName: event.target.value });
  }
  addQuestion=() => {
    const { questions } = this.state;
    const questionDetail = {
      question: '',
      type: '',
      required: '',
    };
    questions.push(questionDetail);
    this.setState({ questions });
    console.log(questions);
  }
  generateComponent=() => this.state.questions.map(questionDetail =>
    (
      <div className="Question" key={rand.generate(5)}>
        <div className="Question-input-area"><input
          className="Question-input"
          type="input"
          value={questionDetail.question}
        />
          <div className="styled" >
            <select>
              <option>Date</option>
              <option>Short answer</option>
              <option>Paragraph</option>
            </select>
          </div>
        </div>
        <div className="Question-lower">
          <hr />
          <div className="Question-options">
            <div
              tabIndex={rand.generate(5)}
              role="button"
              onKeyPress={() => this.deleteQuestion()}
              className="Question-delete-button"
              onClick={() => this.deleteQuestion()}
            >
              <i className="material-icons">delete</i>
            </div>
            <input type="checkbox" name="required" value="required" />Required
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
              onClick={() => this.props.onClick()}
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
