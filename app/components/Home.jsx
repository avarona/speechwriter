import React, { Component } from 'react';
import axios from 'axios';
import annyang from 'annyang';
import Artyom from 'artyom.js';

let artyom = Artyom.ArtyomBuilder.getInstance();
// artyom.initialize({lang: 'en-US'})   // set speech synthesis language

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      voice: false
    }
    this.voiceStop = this.voiceStop.bind(this)
    this.voiceRecord = this.voiceRecord.bind(this)
    this.speechSynthesis = this.speechSynthesis.bind(this)
    this.save = this.save.bind(this)
    this.download = this.download.bind(this)
  }

  render() {
    return (
      <div className="">
        <div id="cube" className="">

          {/* Title & SaveDoc */}
          <div className="row">
            <input
              className="title"
              type="text"
              placeholder="Untitled Document"
              value={this.state.title}
              onChange={evt => this.setState({title: evt.target.value})}
            />
            <div className="file-btns col-lg-2">
              <button
                className="btn btn-success"
                onClick={this.save}>
                  <i className="fa fa-save fa-1x" />
              </button>
              <button
                className="btn btn-warning"
                onClick={this.download}>
                  <i className="fa fa-download fa-1x" />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <div className="row">
              <textarea
                className="main-doc col-lg-8"
                type="text"
                placeholder="Type or start talking..."
                value={this.state.text}
                onChange={evt => this.setState({text: evt.target.value})}
              />
              <div className="col-lg-4">
                save panel
              </div>
          </div>

          {/* Speech Buttons */}
          <div className="speech-btns row">
            { (!this.state.voice)
              ? <button
                  className="btn btn-primary"
                  onClick={this.voiceRecord}>
                    <i className="fa fa-microphone fa-2x" />
                </button>
              : <button
                  className="btn btn-danger"
                  onClick={this.voiceStop}>
                    <i className="fa fa-microphone-slash fa-2x" />
                </button>
            }
            <button
              className="btn btn-info"
              onClick={this.speechSynthesis}>
                <i className="fa fa-volume-up fa-2x" />
            </button>
          </div>

        </div>
      </div>
    )
  }

  voiceStop() {
    annyang.abort()
    this.setState({voice: false})
    console.log('annyang is disabled')
  }

  voiceRecord() {
    if (annyang) {
      annyang.start({
        autoRestart: true,
        continuous: false
      })
      // annyang.setLanguage('es-ES')  // set language feature

      this.setState({voice: true})
      console.log('annyang is enabled')

      const commands = {
        'title *subject': (subject) => {
          this.setState({title: subject})
          console.log('title command has been hit')
        },
        'edit document': () => {
          console.log('edit document has been hit')
          annyang.addCallback('result', (phrases) => {
            if (phrases[0] === 'exit document') {
              console.log('Exitted document edit')
              annyang.removeCallback('result')
            } else {
              let words = this.state.text
              words += phrases[0]
              console.log('Phrase captured: ', phrases[0]);
              console.log('Possible options: ', phrases);
              this.setState({text: words})
            }
          })
        },
        'edit document with *text': (text) => {
          let words = this.state.text
          this.setState({text: words + text})
          console.log('edit document with command hit')
        },
        'stop recording': () => {
          console.log('stop recording command hit')
          return this.voiceStop()
        },
        'erase all': () => {
          this.setState({text: '', title: ''})
          console.log('erase all command hit. State: ', this.state)
        },
        'read document': () => {
          console.log('read document command hit')
          return this.speechSynthesis()
        },
        'save document': () => {
          console.log('save document command hit')
          return this.save()
        },
      }
      annyang.addCommands(commands)
    }
  }

  speechSynthesis() {
    if (artyom) {
      console.log('artyom is enabled')
      if (!this.state.text) {
        artyom.say('There is nothing in your document. Please type something, or press the microphone button to start the speech to text')
      } else {
        artyom.say(this.state.text, {
          onStart: function(){
            console.log('Text is being read...')
          },
          onEnd: function(){
            console.log('End of reading')
          }
        });
      }
    }
  }

  save() {
    axios.post('/api/docs', this.state)
    .then(res => {
      console.log('response', res)
      this.setState({
        title: '',
        text: ''
      })
      alert('Document has been saved!')
    })
    .catch(err => console.error('Did not save', err))
  }

// TODO: CREATE pending download option
  download(event) {
    event.preventDefault()
    axios.get('/api/docs')
    .then(res => {
      console.log('response', res.data.text, res.data.title)
    })
  }

}

export default Home;
