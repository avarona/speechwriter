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
}

class App extends React.Component<{}, State> {
  state = {
    notification: undefined,
    page: {
      title: '',
      body: ''
    }
  }

  saveDocument = () => {
    const { page } = this.state;
    createDoc(page).then(res => this.setState({ notification: 'success' }));
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ page: { title: e.currentTarget.value } });

  handlePageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ page: { body: e.currentTarget.value }});

  render() {
    const { page: { body, title }} = this.state;
    return (
      <div className={styles.appContainer}>
        <Page 
          placeholder="Type something..."
          title={title}
          body={body}
          handleTitleChange={this.handleTitleChange}
          handlePageChange={this.handlePageChange}
        />
        <Controls />
      </div>
    )
  }
};

export default App;
