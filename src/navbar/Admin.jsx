import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/'); // Navigate to the root after logout
    location.reload(); // Refresh the app to apply the new role-based routes
  };

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/report">Report</Link></li>
        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Admin
