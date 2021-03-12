import React from 'react'
import { render } from 'react-dom'
import './app.scss'
import ETHIcon from './assets/images/eth.svg'
import icon from './assets/images/icon-128.png'

const hello = process.env.INFURA_PROJECT_ID
console.log(hello, 'hello')

function App() {
  return (
    <div>
      hello world {hello} <img src={ETHIcon} />
      hello world {hello} <img src={icon} />
    </div>
  )
}

render(<App />, document.getElementById('app'))
