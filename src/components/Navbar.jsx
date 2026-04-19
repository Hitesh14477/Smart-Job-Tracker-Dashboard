import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <h1 className="brand">Smart Job Tracker</h1>
        <nav className="nav-links">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/applications">
            Applications
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/applications/new"
          >
            Add Job
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/analytics">
            Analytics
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
