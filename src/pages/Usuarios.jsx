import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchUsers } from '../services/users';
import { toast } from 'react-toastify';

function Usuarios() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    empresa: '',
    nome: '',
    login: '',
    senha: '',
    email: '',
    celular: '',
    nivel: 'Admin',
    criacao: new Date().toISOString(),
    vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    pacote: 'AI + Whats + Instagram',
    preco: 4500,
    desconto: 0
  });

  const pacotes = [
    { nome: 'AI + Whats + Instagram', preco: 4500 },
    { nome: 'AI + Whats', preco: 3000 },
    { nome: 'AI + Instagram', preco: 3000 }
  ];

  const handlePacoteChange = (pacote) => {
    setFormData({ ...formData, pacote: pacote.nome, preco: pacote.preco });
  };

  const calcularPrecoFinal = () => {
    const desconto = parseFloat(formData.desconto) || 0;
    return formData.preco - desconto;
  };

  // Carregar usuários da API
  useEffect(() => {
    if (user && user.id) {
      loadUsers();
    }
  }, [user?.id]); // Só recarrega se o ID do usuário mudar

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug: verificar o valor da hierarquia
      console.log('Usuário logado:', user);
      console.log('ID:', user?.id, 'Nível:', user?.nivel, 'Hierarquia:', user?.hierarquia);
      
      // Enviar o objeto user completo com id, nivel e hierarquia
      if (!user || !user.id) {
        throw new Error('Dados do usuário não encontrados. Faça login novamente.');
      }
      
      const data = await fetchUsers(user);
      setUsuarios(data);
      // Notificação de sucesso removida - apenas log no console
      console.log(`${data.length} usuário(s) carregado(s) com sucesso!`);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      const errorMsg = err.message || 'Erro ao carregar usuários. Verifique se a API está rodando.';
      setError(errorMsg);
      toast.error(errorMsg + ' ⚠️');
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, senha: password });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatCelularDisplay = (celular) => {
    if (!celular) return '';
    // Se tiver exatamente 11 dígitos, formata
    if (celular.length === 11) {
      return `+55 (${celular.slice(0, 2)}) ${celular.slice(2, 7)}-${celular.slice(7)}`;
    }
    // Senão, retorna como está
    return celular;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implementar chamada à API para criar usuário
    console.log('Dados do novo usuário:', formData);
    toast.success('Usuário criado com sucesso! ✅');
    setShowModal(false);
    // Reset form
    setFormData({
      empresa: '',
      nome: '',
      login: '',
      senha: '',
      email: '',
      celular: '',
      nivel: 'Admin',
      criacao: new Date().toISOString(),
      vencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pacote: 'AI + Whats + Instagram',
      preco: 4500,
      desconto: 0
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderVencimento = (dateString) => {
    if (!dateString) return <span className="text-gray-500">-</span>;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const vencimentoDate = new Date(dateString);
    vencimentoDate.setHours(0, 0, 0, 0);
    
    if (vencimentoDate < today) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          Vencido
        </span>
      );
    }
    
    return <span className="text-gray-700">{formatDate(dateString)}</span>;
  };

  const formatPhone = (phone) => {
    if (!phone) return '-';
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    // Format: +55 (xx) xxxxx-xxxx
    if (cleaned.length === 11) {
      return `+55 (${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    }
    // Format: +55 (xx) xxxx-xxxx for 10 digits
    if (cleaned.length === 10) {
      return `+55 (${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
    }
    return phone;
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return '-';
    // Convert to number if string
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    // Format as Brazilian currency
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numPrice);
  };

  const calculateDaysToExpire = (expirationDate) => {
    if (!expirationDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0); // Reset time to midnight
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderExpirationStatus = (expirationDate) => {
    const daysToExpire = calculateDaysToExpire(expirationDate);
    
    if (daysToExpire === null) {
      return <span className="text-gray-500">-</span>;
    }
    
    if (daysToExpire <= 0) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          Vencido
        </span>
      );
    }
    
    if (daysToExpire <= 7) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
          {daysToExpire} {daysToExpire === 1 ? 'dia' : 'dias'}
        </span>
      );
    }
    
    if (daysToExpire <= 30) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          {daysToExpire} dias
        </span>
      );
    }
    
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        {daysToExpire} dias
      </span>
    );
  };

  const filteredUsers = usuarios.filter(u =>
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHierarquiaBadge = (hierarquia) => {
    const colors = {
      1: 'bg-amber-100 text-amber-700',
      2: 'bg-blue-100 text-blue-700',
      3: 'bg-green-100 text-green-700',
      4: 'bg-gray-100 text-gray-700'
    };
    return colors[hierarquia] || colors[4];
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-600">
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
            disabled={loading}
            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors disabled:opacity-50 shadow-sm"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Add Button */}
        <button 
          onClick={() => setShowModal(true)}
          className="bg-luminaris-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-red-600 font-semibold mb-2">Erro ao carregar dados</h3>
              <p className="text-gray-700 text-sm">{error}</p>
              <button 
                onClick={loadUsers}
                className="mt-3 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Total Usuários</h3>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-gray-900">{usuarios.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Ativos</h3>
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-green-600">{usuarios.filter(u => u.status === 'Ativo').length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Hierarquia 1</h3>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-luminaris-gold">{usuarios.filter(u => u.hierarquia === 1).length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Online Agora</h3>
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-3xl font-bold text-blue-600">1</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-luminaris-gold mb-4"></div>
              <p className="text-gray-900 text-lg">Carregando usuários...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Usuário</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Celular</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Preço</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Vencimento</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Nível</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Último Acesso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p>Nenhum usuário encontrado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-luminaris-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold">{usuario.nome}</p>
                          <p className="text-sm text-gray-500">@{usuario.login}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{usuario.email}</td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{formatPhone(usuario.celular)}</td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap font-semibold">{formatPrice(usuario.preco)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{renderVencimento(usuario.vencimento)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHierarquiaBadge(usuario.hierarquia)}`}>
                        {usuario.nivel} (Nível {usuario.hierarquia})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        usuario.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">{formatDate(usuario.ultimo_log)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-amber-50 rounded-lg transition-colors" title="Editar">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Modal Novo Usuário */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <svg className="w-6 h-6 text-luminaris-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Novo Usuário
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-8 py-6">
              <div className="space-y-6">
                {/* Empresa */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                    placeholder="Nome da empresa"
                  />
                </div>

                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                    placeholder="Nome completo"
                  />
                </div>

                {/* Login */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Login</label>
                  <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                    placeholder="Nome de usuário"
                  />
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                        placeholder="Senha (mínimo 6 caracteres)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-3 bg-luminaris-gold text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold whitespace-nowrap"
                    >
                      Gerar
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Letras, números e caracteres especiais (mínimo 6)</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                    placeholder="email@exemplo.com"
                  />
                </div>

                {/* Celular */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Celular</label>
                  <input
                    type="tel"
                    name="celular"
                    value={formatCelularDisplay(formData.celular)}
                    onChange={handleInputChange}
                    required
                    maxLength={20}
                    placeholder="11980733602"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Digite os 11 dígitos (exemplo: 11980733602)</p>
                </div>

                {/* Nível */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nível</label>
                  <select
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Master">Master</option>
                  </select>
                </div>

                {/* Criação */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Criação</label>
                  <div className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                    {new Date(formData.criacao).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Vencimento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vencimento</label>
                  <input
                    type="date"
                    name="vencimento"
                    value={formData.vencimento}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Padrão: 30 dias após criação</p>
                </div>

                {/* Pacote */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Pacote</label>
                  <div className="space-y-3">
                    {pacotes.map((pacote, index) => (
                      <label
                        key={index}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.pacote === pacote.nome
                            ? 'border-luminaris-gold bg-amber-50'
                            : 'border-gray-200 bg-white hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="pacote"
                            value={pacote.nome}
                            checked={formData.pacote === pacote.nome}
                            onChange={() => handlePacoteChange(pacote)}
                            className="w-4 h-4 text-luminaris-gold focus:ring-luminaris-gold"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{pacote.nome}</p>
                            <p className="text-sm text-gray-600">Pacote completo de automação</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-luminaris-gold">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(pacote.preco)}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Desconto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Desconto (R$)</label>
                  <input
                    type="number"
                    name="desconto"
                    value={formData.desconto}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.preco}
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-luminaris-gold focus:ring-2 focus:ring-luminaris-gold/20 transition-colors"
                    placeholder="0.00"
                  />
                </div>

                {/* Preço Final */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preço Final</label>
                  <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Valor com desconto aplicado</p>
                        {formData.desconto > 0 && (
                          <p className="text-xs text-gray-500 line-through">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(formData.preco)}
                          </p>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-green-700">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(calcularPrecoFinal())}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-luminaris-gold text-white rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-md"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <svg className="w-8 h-8 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-blue-600 font-semibold mb-2">Informação</h3>
            <p className="text-gray-700 text-sm">
              Como usuário <span className="text-luminaris-gold font-semibold">{user?.nivel}</span> (Hierarquia {user?.hierarquia}), 
              você tem acesso total ao sistema e pode gerenciar todos os usuários.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;
