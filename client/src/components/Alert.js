import React from 'react';
import PropTypes from 'prop-types'


const Alert = ({message}) => {

  const {msg, type} = message
  return (
    <div className={`alert alert-${type}`} >
      {msg}
    </div>
  )
}

Alert.propType = {
  message: PropTypes.object.isRequired,
}

export default Alert
