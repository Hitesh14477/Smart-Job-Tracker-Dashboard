import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddApplication from './pages/AddApplication'
import Analytics from './pages/Analytics'
import Applications from './pages/Applications'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<AddApplication />} />
          <Route path="/applications/:id" element={<AddApplication />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
