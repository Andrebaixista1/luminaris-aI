import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Usuarios() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Usuários mockados para demonstração
  const usuarios = [
    {
      id: 1,
      login: 'andrefelipe',
      nome: 'André Felipe',
      email: 'andre@luminaris.ai',
      hierarquia: 1,
      nivel: 'Master',
      status: 'Ativo',
      ultimoAcesso: '2025-11-05 20:30'
    }
  ];

  const filteredUsers = usuarios.filter(u =>
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHierarquiaBadge = (hierarquia) => {
    const colors = {
      1: 'bg-luminaris-yellow text-black',
      2: 'bg-blue-500 text-white',
      3: 'bg-green-500 text-white',
      4: 'bg-gray-500 text-white'
    };
    return colors[hierarquia] || colors[4];
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <span>👥</span>
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-400">
          Gerencie os usuários do sistema e suas permissões
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-luminaris-yellow/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-luminaris-yellow transition-colors"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">🔍</span>
        </div>

        {/* Add Button */}
        <button className="bg-luminaris-yellow text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <span>➕</span>
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Total Usuários</h3>
            <span className="text-2xl">👤</span>
          </div>
          <p className="text-3xl font-bold text-white">{usuarios.length}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Ativos</h3>
            <span className="text-2xl">🟢</span>
          </div>
          <p className="text-3xl font-bold text-green-400">{usuarios.filter(u => u.status === 'Ativo').length}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Hierarquia 1</h3>
            <span className="text-2xl">🔑</span>
          </div>
          <p className="text-3xl font-bold text-luminaris-yellow">{usuarios.filter(u => u.hierarquia === 1).length}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-luminaris-yellow/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm font-medium">Online Agora</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-3xl font-bold text-blue-400">1</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-luminaris-yellow/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50 border-b border-luminaris-yellow/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Usuário</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Nível</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Último Acesso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">🔍</span>
                      <p>Nenhum usuário encontrado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-luminaris-yellow/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-luminaris-yellow/20 rounded-full flex items-center justify-center text-xl">
                          👤
                        </div>
                        <div>
                          <p className="text-white font-semibold">{usuario.nome}</p>
                          <p className="text-sm text-gray-500">@{usuario.login}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{usuario.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHierarquiaBadge(usuario.hierarquia)}`}>
                        {usuario.nivel} (Nível {usuario.hierarquia})
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        usuario.status === 'Ativo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{usuario.ultimoAcesso}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-luminaris-yellow/10 rounded-lg transition-colors" title="Editar">
                          ✏️
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors" title="Excluir">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <span className="text-3xl">ℹ️</span>
          <div>
            <h3 className="text-blue-400 font-semibold mb-2">Informação</h3>
            <p className="text-gray-300 text-sm">
              Como usuário <span className="text-luminaris-yellow font-semibold">{user?.nivel}</span> (Hierarquia {user?.hierarquia}), 
              você tem acesso total ao sistema e pode gerenciar todos os usuários.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
