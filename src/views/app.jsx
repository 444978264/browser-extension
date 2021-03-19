import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './app.scss'

const About = lazy(() => import('./About'))

function change() {
  console.log(chrome, 'chrome')
  // window.open(
  //   chrome.runtime.getURL('popup.html'),
  //   'new window',
  //   'width=420,height=230,resizable,scrollbars=yes,status=1'
  // )
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs, 'tabs')
  })
}

export function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <div>
          <Link to="/about">about</Link>
          <br />
          <Link to="/users">users</Link>
          <br />
          <Link to="/">home1111</Link>
          <br />
          <button onClick={change}>change</button>
        </div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users" component={lazy(() => import('./User'))} />
          <Route path="/" component={lazy(() => import('./Home'))} />
        </Switch>
      </Suspense>
    </Router>
  )
}
