import React, { Component } from 'react'

import '_styles/index.scss'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return <div>helllo</div>
  }
}

export default connect()(App)
