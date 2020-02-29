import React from 'react';
import Notification from '../Notification';
import Page from '../Page';
import Controls from '../Controls';
import styles from './styles.module.scss';
import { fetchDoc, createDoc } from '../../api';

type State = {
  notification?: 'success' | 'error' | 'err-empty' | 'err-nodocs';
  page: {
    body?: string;
    title?: string;
  };
  micOn: boolean;
  speakerOn: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    notification: undefined,
    micOn: false,
    speakerOn: false,
    page: {
      title: '',
      body: ''
    },
  }

  componentDidMount() {
    fetchDoc().then(res => {

    }).catch(err => this.setState({ notification: 'err-nodocs'}));
  }

  save = () => {
    const { page, page: { title, body } } = this.state;
    if(title || body) {
      createDoc(page).then(res => {
        this.setState({ notification: 'success' });
      }).catch(err => this.setState({ notification: 'error' }));
    } else {
      console.log('asdf')
      this.setState({ notification: 'err-empty' })
    }
  }

  toggleMic = () => {
    const { micOn } = this.state;
    this.setState({ micOn: !micOn });
  }

  toggleSpeaker = () => {
    const { speakerOn } = this.state;
    this.setState({ speakerOn: !speakerOn });
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ page: { title: e.currentTarget.value } });

  handlePageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ page: { body: e.currentTarget.value }});

  render() {
    const { page: { body, title }, micOn, speakerOn, notification } = this.state;
    return (
      <div className={styles.appContainer}>
        <Notification message={notification} />
        <Page 
          placeholder="Type something..."
          title={title}
          body={body}
          handleTitleChange={this.handleTitleChange}
          handlePageChange={this.handlePageChange}
        />
        <Controls 
          save={this.save}
          toggleMic={this.toggleMic}
          toggleSpeaker={this.toggleSpeaker}
          micOn={micOn}
          speakerOn={speakerOn}
        />
      </div>
    )
  }
};

export default App;
