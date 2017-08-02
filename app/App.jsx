import React from 'react';
import Home from './Home.jsx';

const App = () => {

  return (
    <div className="container">
      <h1 className="page-title text-center">
        <span
          style={{fontFamily: 'Special Elite'}}>Speech
        </span>
        <span style={{fontFamily: 'Arizonia', fontWeight: 'bold', color: 'blue', fontSize: '1.25em'}}>Writer
        </span>
      </h1>
      <br />
      <Home />
    </div>
  )
}

export default App;
