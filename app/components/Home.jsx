import React, { Component } from 'react';
import { connect } from 'react-redux';
import annyang from 'annyang';

// The Home component might contain your homepage content. Adding new routes to routes.js will cause them to be rendered instead when those urls are accessed.

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''}
    this.record = this.record.bind(this)
  }

  render() {
    return (
      <div>
        <h2>Speech to Text</h2>
        <div
          id="cube"
          onClick={this.record}>
            <button>Click Me</button>
        </div>
      </div>
    )
  }

  record() {
    let words = ''
    if (annyang) {
      console.log('annyang is listening')

      annyang.addCallback('result', function(phrases) {
        words += phrases[0]
        console.log("I think the user said: ", phrases[0]);
        console.log("But then again, it could be any of the following: ", phrases);
      })

      // Tell KITT to use annyang
      SpeechKITT.annyang();

      // Define a stylesheet for KITT to use
      SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

      // Render KITT's interface
      SpeechKITT.vroom();

    }

  }
}

export default Home;
