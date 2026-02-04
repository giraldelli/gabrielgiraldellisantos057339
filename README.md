<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Especificações - PetConnect</title>
  <style>
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background-color: #0ea5e9; color: white; }
    tr:nth-child(even) { background-color: #f8fafc; }
    h2 { margin-top: 2rem; color: #0c4a6e; }
  </style>
</head>
<body>
  <h1>Especificações Técnicas - PetConnect</h1>

  <h2>Linguagens de Programação</h2>
  <table>
    <thead>
      <tr>
        <th>Linguagem</th>
        <th>Uso</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>TypeScript</strong></td><td>Lógica da aplicação, serviços e componentes</td></tr>
      <tr><td><strong>HTML</strong></td><td>Estrutura base da página</td></tr>
      <tr><td><strong>CSS</strong></td><td>Estilos customizados e animações</td></tr>
      <tr><td><strong>JSON</strong></td><td>Configurações (package.json, tsconfig)</td></tr>
    </tbody>
  </table>

  <h2>Frameworks</h2>
  <table>
    <thead>
      <tr>
        <th>Framework</th>
        <th>Versão</th>
        <th>Uso</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>React</strong></td><td>^19.2.4</td><td>Interface e componentes</td></tr>
      <tr><td><strong>Vite</strong></td><td>^6.2.0</td><td>Build e servidor de desenvolvimento</td></tr>
      <tr><td><strong>Tailwind CSS</strong></td><td>CDN</td><td>Estilização utilitária</td></tr>
    </tbody>
  </table>

  <h2>Bibliotecas (Dependências)</h2>
  <table>
    <thead>
      <tr>
        <th>Biblioteca</th>
        <th>Versão</th>
        <th>Uso</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>React DOM</strong></td><td>^19.2.4</td><td>Renderização no navegador</td></tr>
      <tr><td><strong>React Router DOM</strong></td><td>^7.13.0</td><td>Rotas e navegação</td></tr>
      <tr><td><strong>Axios</strong></td><td>^1.13.4</td><td>Requisições HTTP à API</td></tr>
      <tr><td><strong>Lucide React</strong></td><td>^0.563.0</td><td>Ícones</td></tr>
      <tr><td><strong>@google/genai</strong></td><td>^1.39.0</td><td>IA para biografias (Gemini)</td></tr>
    </tbody>
  </table>

  <h2>Bibliotecas (Desenvolvimento)</h2>
  <table>
    <thead>
      <tr>
        <th>Biblioteca</th>
        <th>Versão</th>
        <th>Uso</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>TypeScript</strong></td><td>~5.8.2</td><td>Tipagem estática</td></tr>
      <tr><td><strong>@vitejs/plugin-react</strong></td><td>^5.0.0</td><td>Plugin React no Vite</td></tr>
      <tr><td><strong>@types/node</strong></td><td>^22.14.0</td><td>Tipos Node.js</td></tr>
    </tbody>
  </table>

  <h2>APIs Externas</h2>
  <table>
    <thead>
      <tr>
        <th>API</th>
        <th>Uso</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>pet-manager-api.geia.vip</strong></td><td>Backend de pets e tutores</td></tr>
      <tr><td><strong>Google Gemini API</strong></td><td>Geração de biografias de pets</td></tr>
    </tbody>
  </table>
</body>
</html>

1. Instalar as dependencias com "npm install"
2. Abrir o site em local "npm run dev"
3. Se caso não conseguir rodar o npm install, vai precisar ativar uma permissão no windows powershell e reiniciar. Para isso siga os passos 
Passo a passo rápido:
- Abra o PowerShell como Administrador (clique com o botão direito no menu Iniciar > "Windows PowerShell (Admin)").
- Execute: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser.
- Confirme com Y.
- Tente o npm install novamente no seu projeto. 
4. Após conseguir abrir a interface principal utilize:
  Login: teste
  Senha: teste123
