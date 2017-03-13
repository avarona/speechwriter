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
      voice: false,
      speech: false,
      saved: []
    }
    this.voiceStop = this.voiceStop.bind(this)
    this.voiceRecord = this.voiceRecord.bind(this)
    this.speechSynthesis = this.speechSynthesis.bind(this)
    this.speechStop = this.speechStop.bind(this)
    this.save = this.save.bind(this)
    this.getSaves = this.getSaves.bind(this)
    this.getSaveById = this.getSaveById.bind(this)
  }

  componentDidMount() {
    this.getSaves()
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
                <ul>

                    SavePanel:
                      {
                        this.state.saved
                        .map(doc => {
                          return (
                            <a
                              key={doc.id}
                              href="#"
                              onClick={

                                this.getSaveById(doc.id)
                              }
                            >
                              <li>
                                {doc.title}
                              </li>
                            </a>
                          )
                        })
                      }

                  {/* <h3>Speech Commands</h3>
                  <li>'title' *title* - change title</li>
                  <li>'edit document' - enter continuous edit mode</li>
                  <li>'exit document' - exit continuous mode</li>
                  <li>'edit document with' *text* - edit document once with specified text</li>
                  <li>'stop recording' - turn speech-to-text off</li>
                  <li>'erase all' - erase title and document</li>
                  <li>'read document' - enable text-to-speech</li>
                  <li>'save document' - save to database</li> */}
                </ul>
              </div>
          </div>

          {/* Speech Buttons */}
          <div className="speech-btns row">
            { (!this.state.speech)
              ? <button
                className="btn btn-info"
                onClick={this.speechSynthesis}>
                  <i className="fa fa-volume-off fa-2x" />
              </button>
              : <button
                className="btn btn-danger"
                onClick={this.speechStop}>
                  <i className="fa fa-volume-up fa-2x" />
              </button>
            }

            { (!this.state.voice)
              ? <button
                className="btn btn-primary"
                onClick={this.voiceRecord}>
                <i className="fa fa-microphone-slash fa-2x" />
              </button>
              : <button
                className="btn btn-danger"
                onClick={this.voiceStop}>
                <i className="fa fa-microphone fa-2x" />
              </button>
            }
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
      this.setState({speech: true})
      console.log('artyom is enabled')
      if (!this.state.text) {
        artyom.say('Please type something, or press the microphone button to start the speech to text', {
          onEnd: () => this.setState({speech: false})
        })
      } else {
        artyom.say(this.state.text, {
          onStart: () => {
            console.log('Text is being read...')
          },
          onEnd: () => {
            this.setState({speech: false})
            console.log('End of reading')
          }
        })
      }
    }
  }

  speechStop() {
    artyom.shutUp()
    this.setState({speech: false})
    console.log('artyom is disabled')
  }

  save() {
    axios.post('/api/docs', {
      title: (!this.state.title.length) ? 'Untitled Document' : this.state.title,
      text: this.state.text
    })
    .then(() => {
      this.setState({
        title: '',
        text: ''
      })
      this.getSaves()
    })
    .catch(err => console.error('Did not save', err))
  }

  getSaves() {
    axios.get('/api/docs')
    .then(res => {
      this.setState({saved: res.data})
    })
  }

  getSaveById(id) {
    event.preventDefault()
    axios.get(`/api/docs/${id}`)
    .then(res => {
      console.log(this)
      // this.setState({title: res.data.title, text: res.data.text})
      console.log('response', res.data)
    })
  }

// TODO: CREATE download option

}

export default Home;
