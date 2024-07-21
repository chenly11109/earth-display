import React from 'react'
import ReactDOM from 'react-dom'
import './index.module.css'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mock/browser')
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
