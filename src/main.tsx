import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routs/routs.tsx'
import "./index.css"
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
