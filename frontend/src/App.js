import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Lists from './components/Lists';
import Header from './components/Header';

// Auth check function
const isAuthenticated = () => !!localStorage.getItem('token');

// Protected Route Component
const ProtectedRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Header /> {/* Display header above all routes */}
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/search"
        element={<ProtectedRoute element={Search} />}
      />
      <Route
        path="/lists"
        element={<ProtectedRoute element={Lists} />}
      />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  </Router>
);

export default App;
