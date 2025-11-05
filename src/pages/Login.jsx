import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authenticateUser } from '../services/auth';
import { toast } from 'react-toastify';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authenticateUser(login, password);
      
      if (user) {
        toast.success(`Bem-vindo, ${user.nome || user.login}! 🚀`);
        loginUser(user);
      } else {
        toast.error('Login ou senha incorretos 🚫');
        setError('Login ou senha incorretos');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      toast.error('Erro ao fazer login. Tente novamente. ⚠️');
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luminaris-dark via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.svg" alt="Luminaris AI" className="w-16 h-16" />
            <h1 className="text-4xl font-bold">
              <span className="text-luminaris-yellow">Luminaris</span>
              <span className="text-white"> AI</span>
            </h1>
          </div>
          <p className="text-gray-400">Faça login para acessar o dashboard</p>
        </div>

        {/* Card de Login */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-luminaris-yellow/20 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Login */}
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-gray-300 mb-2">
                Login
              </label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-luminaris-yellow transition-colors"
                placeholder="Digite seu login"
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-luminaris-yellow transition-colors"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-luminaris-yellow text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Dica de Teste */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              🔐 Sistema de autenticação seguro
            </p>
          </div>
        </div>

        {/* Link para Landing Page */}
        <div className="mt-6 text-center">
          <a 
            href="/"
            className="text-luminaris-yellow hover:text-yellow-400 transition-colors text-sm"
          >
            ← Voltar para página inicial
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
