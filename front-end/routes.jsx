import Login from "./src/components/Login/Login";
import Register from "./src/components/Register/Register"
import Dashboard from "./src/components/UserDashboard/Dashboard";
import ProtectedRoute from "./src/ProtectedRoute";


const routes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default routes;