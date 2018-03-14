import React from 'react';
import PropTypes from 'prop-types';
import './Responses.css';

const rand = require('random-key');

const getResponses = responses => responses.map((response, index) =>
  (
    <p
      className={index % 2 === 0 ? 'Response-even' : 'Response-odd'}
      key={rand.generate(5)}
    >
      {response}
    </p>
  ));
const Responses = (props) => {
  const questions = props.data.data.map(question => (
    <div className="Question-container" key={rand.generate(5)}>
      <p className="Question-statement">
        {question.question}
      </p>
      <p className="Question-heading-message">
      Last 7 responses
      </p>
      <div className="Question-responses">
        {getResponses(question.responses)}
      </div>
    </div>
  ));
  return (
    <div className="Responses">
      <div className="Responses-header" />
      <div className="Responses-body" >
        <div className="Responses-Main-Box" >
          <p className="Responses-title">{props.data.formName}</p>
          <div className="Responses-questions-container">
            {questions}
          </div>
          <button
            className="Responses-submit-button"
            onClick={() => props.onClick()}
            type="button"
          >Go Back
          </button>
        </div>
      </div>
    </div>
  );
};


Responses.propTypes = {
  data: PropTypes.shape({
    formName: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      responses: PropTypes.arrayOf(PropTypes.string),
    })),
  }),
  onClick: PropTypes.func,
};

Responses.defaultProps = {
  data: null,
  onClick: () => null,
};

export default Responses;
