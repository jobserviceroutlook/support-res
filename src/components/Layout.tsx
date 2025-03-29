import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Menu, X } from 'lucide-react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">Support-Res</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link to="/services" className="text-gray-700 hover:text-indigo-600">
                Services
              </Link>
              {user && (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                    Dashboard
                  </Link>
                  <Link to="/orders" className="text-gray-700 hover:text-indigo-600">
                    Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center text-gray-700 hover:text-indigo-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              )}
              {!user && (
                <Link
                  to="/auth"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/services"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
              >
                Services
              </Link>
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Sign Out
                  </button>
                </>
              )}
              {!user && (
                <Link
                  to="/auth"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}