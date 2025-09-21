import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Meta from './components/Meta.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Meta />
  </StrictMode>,
)
