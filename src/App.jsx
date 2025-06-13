import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function ProtectedDashboard() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}

function LoginPage() {
  return (
    <PublicRoute>
      <SignIn />
    </PublicRoute>
  );
}

function RegisterPage() {
  return (
    <PublicRoute>
      <SignUp />
    </PublicRoute>
  );
}

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <ProtectedDashboard />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
