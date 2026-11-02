import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/design-system/tokens.css'
import './styles/design-system/themes.css'
import './index.css'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
