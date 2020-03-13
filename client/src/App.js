import React from 'react';
import './App.css';

// Comp 
import FileUpload from './components/FileUpload';
import Alert from './components/Alert';


const App = () => {
  return (
    <div className='container mt-4'>
      <h4 className="display-4 text-center mb-4">
        <div className="fab fa-react">React File Upload</div>
      </h4>
      {/* <Alert/> */}
      <FileUpload/>
      
    </div>
  )
}

export default App
