import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppVentas } from './AppVentas'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppVentas/>
  </StrictMode>,
)
