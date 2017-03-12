import React, { Component } from 'react';
import axios from 'axios';

class SavePanel extends Component {
  constructor(props) {
    super(props)
    this.getSaves = this.getSaves.bind(this)
  }

  render() {
    return (
      <div>
      </div>
    )
  }

  getSaves() {
    axios.get('/api/docs')
    .then(res => {
      let array = []
      res.data.forEach(doc => {
        array.push(doc.title)
      })
      this.setState({saveArray: array})
    })
    console.log(this.state)
  }

}
export default SavePanel;
