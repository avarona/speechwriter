import React from 'react';
import Page from '../Page';
import styles from './styles.module.scss';

const App = () => (
  <div className={styles.appContainer}>
    <h1>SpeechWriter</h1>
      <Page placeholder="Type something..." />
  </div>
);

export default App;
