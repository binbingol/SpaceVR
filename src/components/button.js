import React from 'react';
import {
  Text,
  VrButton,
} from 'react-vr';

const styles = {
  buttonStyle: {
    margin: 0.05,
    height: 0.4,
    backgroundColor: 'red',
  },
  textStyle: {
    fontSize: 0.3,
    textAlign: 'center',
  },
};

const Button = (props) => {
  const { callback, text } = props;
  return (
    <VrButton style={styles.buttonStyle} onClick={() => { callback(); }} >
      <Text style={styles.textStyle} >
        {text}
      </Text>
    </VrButton>
  );
};

Button.propTypes = {
  callback: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default Button;
