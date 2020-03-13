import React from 'react';
import PropTypes from 'prop-types'


const ProgressBar = ({ percentage, display }) => {

  const p = display === 'danger' ? 0 : percentage


  return (
    <div className="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${p}%` }}>
        {percentage}%
      </div>

    </div>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
}

export default ProgressBar
