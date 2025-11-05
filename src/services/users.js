const API_URL = 'https://n8n.apivieiracred.store/webhook-test/get-users';

export const fetchUsers = async (user) => {
  try {
    // Montar URL com todos os parâmetros
    const params = new URLSearchParams({
      id: user?.id || '',
      nivel: user?.nivel || '',
      hierarquia: user?.hierarquia || '',
      empresa: user?.empresa || ''
    });
    
    const url = `${API_URL}?${params.toString()}`;
    console.log('URL da requisição:', url);
    
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      // Assumindo que o n8n retorna um array de usuários
      return Array.isArray(data) ? data : data.users || [];
    }
    
    throw new Error('Erro ao buscar usuários');
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
    
    throw new Error('Usuário não encontrado');
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};
