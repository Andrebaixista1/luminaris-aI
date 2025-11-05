const API_URL = 'https://n8n.apivieiracred.store/webhook/users';

export const authenticateUser = async (login, password) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Se a resposta é um array, pegar o primeiro elemento
      const user = Array.isArray(data) ? data[0] : (data.user || data);
      
      // Validar se tem dados do usuário
      if (user && user.id) {
        return user;
      }
      
      return null;
    }

    // Se retornou erro 401 ou 403, credenciais inválidas
    if (response.status === 401 || response.status === 403) {
      return null;
    }

    // Outros erros
    console.error('Erro na API:', response.status);
    return null;
    
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return null;
  }
};
