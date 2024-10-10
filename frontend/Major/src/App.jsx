import { useState } from 'react';
import './App.css';
import Upload from './Upload';
import Fetch from './Fetch';
import Delete from './Delete';

function App() {
  return (
    <div className="App">
      <div className="flex flex-col justify-center items-center min-h-screen p-8 space-y-8">
        {/* Upload Component */}
        {/* <div className="w-full max-w-md">
          <Upload />
        </div> */}

        {/* Delete Component */}
        <div className="w-full max-w-md">
          <Delete />
        </div>

        {/* Fetch Component */}
        <div className="w-full max-w-4xl">
          <Fetch />
        </div>
      </div>
    </div>
  );
}

export default App;
