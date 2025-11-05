// Usuários mockados - em produção isso viria de uma API
export const mockUsers = [
  {
    id: 1,
    login: 'andrefelipe',
    password: 'Mudar@123',
    nome: 'André Felipe',
    hierarquia: 1,
    nivel: 'Master'
  }
];

export const authenticateUser = (login, password) => {
  const user = mockUsers.find(
    u => u.login === login && u.password === password
  );
  
  if (user) {
    // Não retorna a senha
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};
