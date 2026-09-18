import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ElementList from './components/ElementList'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ElementList />
  </StrictMode>,
)
