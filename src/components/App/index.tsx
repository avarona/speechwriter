import React from 'react';
import Notification from '../Notification';
import Page from '../Page';
import Controls from '../Controls';
import styles from './styles.module.scss';
import { fetchDocs, createDoc } from '../../api';

type Props = {}

type State = {
  notification?: NotifMessage;
  pages: Array<Page>;
  page: Page;
  micOn: boolean;
  speakerOn: boolean;
}

class App extends React.Component<Props, State> {
  state = {
    notification: undefined,
    pages: [],
    micOn: false,
    speakerOn: false,
    page: {
      title: '',
      body: ''
    },
  }

  componentDidMount() {
    fetchDocs().then(res => {
      console.log('response', res)
    }).catch(err => this.setState({ notification: 'err-nodocs'}));
  }

  componentDidUpdate(props: Props, state: State) {
    console.log('asdf', props, state)
    if(state.notification) {
      setTimeout(() => this.setState({ notification: undefined }), 2000)
    }
  }

  save = () => {
    const { page } = this.state;
    if(page.title || page.body) {
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

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { page } = this.state;
    this.setState({
      page: {
        ...page,
        title: e.currentTarget.value
      }
    });
  };

  handlePageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { page } = this.state;
    this.setState({ 
      page: {
        ...page,
        body: e.currentTarget.value
      }
    });
  };

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
