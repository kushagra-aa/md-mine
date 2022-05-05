import './shim'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'

const rootElm = document.getElementById('root')
const root = createRoot(rootElm!)
root.render(<App />)
