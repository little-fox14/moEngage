import { Link } from 'react-router-dom';


    const Header = () => {
  const handleLogout = () => {
    // Remove token from localStorage and redirect to login page
    localStorage.removeItem('token');
    window.location.href = '/login';  // Redirect to login
  };
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">HTTP Code Explorer</h1>
        <nav className="space-x-6">
          <Link
            to="/search"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
          >
            Search
          </Link>
          <Link
            to="/lists"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
          >
            Saved Lists
          </Link>
          {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
        </nav>
       
      </div>
    </header>
  );
};

export default Header;
