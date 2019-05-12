import React from "react"
import { render } from "react-dom"

import './index.scss'

const App = () => (
  <div>
    <h1>React scaffolding kit</h1>
    <strong>An opiniated but customizable react starter kit</strong>
  </div>
)

render(<App />, document.getElementById("REACT_ROOT"))
