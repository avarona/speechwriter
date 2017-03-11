import React, { Component } from 'react';
import axios from 'axios';
import annyang from 'annyang';
import Artyom from 'artyom.js';

let artyom = Artyom.ArtyomBuilder.getInstance();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''}
    this.voiceRecord = this.voiceRecord.bind(this)
    this.keyboardType = this.keyboardType.bind(this)
    this.speechSynthesis = this.speechSynthesis.bind(this)
    this.saveDoc = this.saveDoc.bind(this)
  }

  render() {
    return (
      <div className="container">
        <h2>Speech to Text</h2>
        <div id="cube">

          {/* TextArea & SaveDoc */}
          <form onSubmit={this.saveDoc}>
            <div>
              <textarea
                className="main-doc"
                type="text"
                style={{width: '600px', height: '50vh'}}
                placeholder="type or start talking..."
                value={this.state.text}
                onChange={this.keyboardType}
              />
            </div>
            <div>
              <button
                className="btn btn-success">
                  <i className="fa fa-save fa-2x" />
              </button>
            </div>
          </form>

          {/* Speech Buttons */}
          <button
            className="btn btn-primary"
            onClick={this.voiceRecord}>
            <i className="fa fa-microphone fa-2x" />
          </button>
          <button
            className="btn btn-info"
            onClick={this.speechSynthesis}>
            <i className="fa fa-volume-up fa-2x" />
          </button>

        </div>
      </div>
    )
  }

  keyboardType(evt) {
    this.setState({text: evt.target.value})
  }

  voiceRecord(event) {
    event.preventDefault()
    if (annyang) {
      annyang.start()
      console.log('annyang is enabled')
      let words = this.state.text

    // TODO: FIX voice recognition overwrites typed state

    // TODO: CREATE erase all ; enter ; indent ; show me timer ; submit/save
      const commands = {
        'erase all': () => {
          this.setState({text: ''})
          console.log('erase all command hit', this.state)
        },
        'enter': () => {
          words = words + '\n'
          console.log('enter command hit', words)
      },
        'indent': () => {
          words = '  ' + words
          console.log('indent command hit', words)
      },
        'show me timer': () => {
          console.log('show me timer command hit')
      },
        'save': () => {
          console.log('save command hit', words)
        }
      }

      annyang.addCallback('result', (phrases) => {
        words += phrases[0]
        console.log('I think the user said: ', phrases[0]);
        console.log('But then again, it could be any of the following: ', phrases);
        this.setState({text: words})
      })
    }
  }

  speechSynthesis() {
    if (artyom) {
      console.log('artyom is enabled')
      if (!this.state.text) {
        artyom.say('There is nothing in your document')
      } else {
        artyom.say(this.state.text, {
          onStart: function(){
            console.log('Text is being read...')
          },
          onEnd: function(){
            console.log('End of text')
          }
        });
      }
    }
  }

  saveDoc(event) {
    event.preventDefault()
    console.log('1. button hit')
    console.log(this, 'this')
    axios.post('/api/save', this.state)
    .then((res) => {
      console.log('5. response', res)
      this.setState({text: ''}) // remove text after save?
      console.log('6. state after route: ', this.state.text)
    })
    .catch(err => console.error('Did not save', err))
  }

}

export default Home;
