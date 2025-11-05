import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

function Dashboard() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Formatar data
      const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('pt-BR', dateOptions));
      
      // Formatar hora
      setCurrentTime(now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-luminaris-yellow/10 via-yellow-500/5 to-transparent rounded-2xl border border-luminaris-yellow/20 p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {getGreeting()}, <span className="text-luminaris-yellow">{user?.nome || user?.login}</span>! 👋
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span className="capitalize">{currentDate}</span>
              </div>
              <div className="hidden sm:block text-gray-600">•</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕐</span>
                <span>{currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Nível de Acesso</h3>
              <span className="text-2xl">🔑</span>
            </div>
            <p className="text-3xl font-bold text-luminaris-yellow mb-1">{user?.nivel}</p>
            <p className="text-sm text-gray-500">Hierarquia {user?.hierarquia}</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Permissões</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">Total</p>
            <p className="text-sm text-gray-500">Acesso completo ao sistema</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">Status</h3>
              <span className="text-2xl">🟢</span>
            </div>
            <p className="text-3xl font-bold text-green-400 mb-1">Ativo</p>
            <p className="text-sm text-gray-500">Sistema operacional</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-luminaris-yellow/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>📊</span>
            Dashboard Principal
          </h2>
          
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-luminaris-yellow/10 rounded-full mb-6">
              <span className="text-5xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Dashboard em Desenvolvimento
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Em breve você terá acesso a estatísticas, relatórios e ferramentas de gerenciamento completas.
            </p>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
