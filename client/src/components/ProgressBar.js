import React from 'react';
import PropTypes from 'prop-types'


const ProgressBar = ({ percentage, display}) => {

  const p = display === 'danger' ? 0 : percentage

  
  return (
    <div className="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  style={{width: `${p}%`}}>
        {percentage}%
      </div>
     
    </div>

  //   <div class="progress">
  //     <div class="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
  //   </div>
  )
}

export default ProgressBar
