const TOKEN_TESTE = 'token-teste-petconnect';

export const isTestAccount = () => {
  return localStorage.getItem('petconnect_token') === TOKEN_TESTE;
};
