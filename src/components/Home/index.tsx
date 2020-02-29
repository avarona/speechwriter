import React from 'react';
import axios from 'axios';
import { FaMicrophoneSlash, FaMicrophone, FaVolumeUp, FaVolumeOff, FaSave, FaTimesCircle } from 'react-icons/fa';
import Annyang from 'annyang';
import Artyom from 'artyom.js';

const artyom = new Artyom() //Artyom.ArtyomBuilder.getInstance();
// artyom.initialize({lang: 'en-US'})   // set speech synthesis language

type State = {
  title: string;
  text: string;
  voice: boolean;
  speech: boolean;
  saved: any;
}

class Home extends React.Component<{}, State> {
  state = {
    title: '',
    text: '',
    voice: false,
    speech: false,
    saved: []
  }

  componentDidMount() {
    this.getSaves()
  }

  render() {
    return (
      <div>
        <div id="cube">

          {/* Title & SaveDoc */}
          <div className="row">
            <input
              className="title"
              type="text"
              placeholder="Untitled Document"
              value={this.state.title}
              onChange={evt => this.setState({title: evt.target.value})}
            />
          </div>

          {/* TextArea */}
          <div className="row">
            <div className="textarea col-lg-8">
              <textarea
                className="main-doc col-lg-12"
                placeholder="Type or start talking..."
                value={this.state.text}
                onChange={evt => this.setState({text: evt.target.value})}
              />
              <div className="btns">
                  <button
                    className="btn btn-success"
                    onClick={this.save}>
                    <FaSave size={30} />
                  </button>
                { (!this.state.speech)
                  ? <button
                    className="btn btn-info"
                    onClick={this.speechSynthesis}>
                    <FaVolumeOff size={30} />
                  </button>
                  : <button
                    className="btn btn-danger"
                    onClick={this.speechStop}>
                      <FaVolumeUp size={30} />
                  </button>
                }
                { (!this.state.voice)
                  ? <button
                    className="btn btn-primary"
                    onClick={this.voiceRecord}>
                    <FaMicrophoneSlash size={30} />
                  </button>
                  : <button
                    className="btn btn-danger"
                    onClick={this.voiceStop}>
                    <FaMicrophone size={30} />
                  </button>
                }
              </div>
            </div>
            <div className="col-lg-4">
              <ol className="command-list">
                <h5 className="text-center">Speech Commands</h5>
                  <li><strong>'title'</strong> *title*</li>
                  <li><strong>'edit document'</strong> - enter edit mode</li>
                  <li><strong>'exit document'</strong> - exit edit mode</li>
                  <li><strong>'edit document with'</strong> *text*</li>
                  <li><strong>'erase all'</strong> - delete title and text</li>
                  <li><strong>'read document'</strong></li>
                  <li><strong>'save document'</strong></li>
                  <li><strong>'stop recording'</strong></li>
              </ol>
              <br />
              <ul className="save-panel">
                <h5 className="text-center">Saved Documents</h5>
                  {
                    this.state.saved.map((doc: any) => (
                        <li
                          key={doc.id}
                          onClick={this.getSaveById.bind(this, doc.id)}>
                          <button>
                            <FaTimesCircle
                              style={{
                                margin: '0 10px',
                                color: 'red'
                              }}
                              size={20}
                              onClick={this.delete.bind(this, doc.id)} />
                          </button>
                          <button>
                            {doc.title}
                          </button>
                        </li>
                      )
                    )
                  }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  voiceStop = () => {
    Annyang.abort()
    this.setState({voice: false})
    console.log('Annyang is disabled')
  }

  voiceRecord = () => {
    if (Annyang) {
      Annyang.start({
        autoRestart: true,
        continuous: false
      })
      // Annyang.setLanguage('es-ES')  // set language feature

      this.setState({voice: true})
      console.log('Annyang is enabled')

      const commands = {
        'title *subject': (subject: string) => {
          this.setState({title: subject})
          console.log('title command has been hit')
        },
        'edit document': () => {
          console.log('edit document has been hit')
          Annyang.addCallback('result', (phrases: Array<string>) => {
            if (phrases[0] === 'exit document') {
              console.log('Exitted document edit')
              Annyang.removeCallback('result')
            } else {
              let words = this.state.text
              words += phrases[0]
              console.log('Phrase captured: ', phrases[0]);
              console.log('Possible options: ', phrases);
              this.setState({text: words})
            }
          })
        },
        'edit document with *text': (text: string) => {
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
      Annyang.addCommands(commands)
    }
  }

  speechSynthesis = () => {
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

  speechStop = () => {
    artyom.shutUp()
    this.setState({speech: false})
    console.log('artyom is disabled')
  }

  save = () => {
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

  getSaves = () => {
    axios.get('/api/docs')
    .then(res => {
      this.setState({saved: res.data})
    })
  }

  getSaveById = (id: number) => {
    axios.get(`/api/docs/${id}`)
    .then(res => {
      this.setState({
        title: res.data.title,
        text: res.data.text
      })
    })
    .catch(err => console.error(err))
  }

  delete = (id: number) => {
    axios.delete(`/api/docs/${id}`)
    .then((res) => {
      this.setState({
        saved: res.data,
        title: '',
        text: ''
      })
    })
    .catch(err => console.error(err))
  }

// TODO: CREATE download option

}

export default Home;
