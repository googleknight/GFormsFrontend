import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => (
  <button
    className="Button-style"
    type="button"
    onClick={props.onClick}
  >{props.value}
  </button>
);

Button.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  value: '',
  onClick: () => null,
};

export default Button;
