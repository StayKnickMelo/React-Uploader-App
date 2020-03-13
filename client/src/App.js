import React from 'react';
import './App.css';

// Comp 
import FileUpload from './components/FileUpload';



const App = () => {
  return (
    <div className='container mt-4'>
      <h4 className="display-4 text-center mb-4">
        <div> <i style={{ color: '#61DAFB' }} className="fab fa-react"></i> React File Uploader</div>
      </h4>
      
      <FileUpload />

    </div>
  )
}

export default App
