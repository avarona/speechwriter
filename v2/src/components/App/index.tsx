import React from 'react';
import Page from '../Page';
import Button from '../Button';
import styles from './styles.module.scss';
import { createDoc } from '../../api';

type State = {
  notification?: 'success' | 'error';
  page: {
    body?: string;
    title?: string;
  };
}

class App extends React.Component<{}, State> {
  state = {
    notification: undefined,
    page: {
      title: undefined,
      body: undefined
    }
  }

  saveDocument = () => {
    const { page } = this.state;
    createDoc(page).then(res => this.setState({ notification: 'success' }));
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <h1>SpeechWriter</h1>
        <Button onClick={this.saveDocument}>Create</Button>
          <Page placeholder="Type something..." />
      </div>
    )
  }
};

export default App;
