import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    toast.info('Até logo! 👋');
    logout();
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '📊'
    },
    {
      name: 'Usuários',
      path: '/dashboard/usuarios',
      icon: '👥'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luminaris-dark via-gray-900 to-black">
      {/* Header */}
      <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-md border-b border-luminaris-yellow/20">
        <div className="px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-luminaris-yellow hover:text-yellow-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Luminaris AI" className="w-10 h-10" />
                <div className="text-2xl font-bold">
                  <span className="text-luminaris-yellow">Luminaris</span>
                  <span className="text-white"> AI</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-400">Logado como</p>
                <p className="text-white font-semibold">{user?.nome || user?.login}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
              >
                <span className="hidden sm:inline">Sair</span>
                <span>🚪</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-black/30 backdrop-blur-md border-r border-luminaris-yellow/20 transform transition-transform duration-300 ease-in-out pt-16 lg:pt-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* User Info */}
            <div className="p-6 border-b border-luminaris-yellow/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-luminaris-yellow/20 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="text-white font-semibold">{user?.nome || user?.login}</p>
                  <p className="text-xs text-luminaris-yellow">{user?.nivel}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-luminaris-yellow text-black font-semibold'
                        : 'text-gray-300 hover:bg-luminaris-yellow/10 hover:text-luminaris-yellow'
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Footer Info */}
            <div className="p-4 border-t border-luminaris-yellow/20">
              <div className="text-center">
                <p className="text-xs text-gray-500">Luminaris AI v1.0</p>
                <p className="text-xs text-gray-600 mt-1">© 2025</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
