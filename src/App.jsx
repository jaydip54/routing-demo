import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './componant/Login.JSX';
import Admin from './navbar/Admin';
import User from './navbar/User';
import AdminDashboard from './componant/AdminDashboard';
import UserDashboard from './componant/UserDashboard';
import Report from './componant/Report';
import Notfound from './componant/Notfound';
// Import the Create component if not already imported
import Create from './componant/Create';

const getRole = () => localStorage.getItem('role');

const App = () => {
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    const storedRole = getRole();
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Layout Components
  const Mainlyout = () => (
    <div>
      {/* Common Layout can go here */}
    </div>
  );

  const AdminLayout = () => (
    <div>
      <Admin />
      <Outlet />
    </div>
  );

  const UserLayout = () => (
    <div>
      <User />
      <Outlet />
    </div>
  );

  // Define the Router with Role-Based Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {role === null || role === "" ? (
          // Login route if no role is set
          <Route path="/" element={<Login />} />
        ) : role === 'ADMIN' ? (
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/report" element={<Report />} />
          </Route>
        ) : role === 'USER' ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/user/ticketcreation" element={<Create />} />
          </Route>
        ) : (
          // Fallback to Notfound if role does not match
          <Route path="*" element={<Notfound />} />
        )}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
