import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'
import { ApplicationProvider } from './context/ApplicationContext'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicationProvider>
        <App />
        <ToastContainer position="top-right" autoClose={2200} />
      </ApplicationProvider>
    </BrowserRouter>
  </StrictMode>,
)
