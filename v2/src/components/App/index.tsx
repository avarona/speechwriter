import React from 'react';
import Page from '../Page';
import Controls from '../Controls';
import styles from './styles.module.scss';
import { createDoc } from '../../api';

type State = {
  notification?: 'success' | 'error';
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

  save = () => {
    const { page } = this.state;
    createDoc(page).then(res => this.setState({ notification: 'success' }));
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
    const { page: { body, title }, micOn, speakerOn } = this.state;
    return (
      <div className={styles.appContainer}>
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
