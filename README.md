# Task Manager Frontend Angular

Uma aplicação frontend moderna para gerenciamento de tarefas, desenvolvida com Angular. Oferece uma interface intuitiva para criar, editar, visualizar e gerenciar tarefas, com funcionalidades de autenticação, dashboard com estatísticas e gráficos interativos.

## Funcionalidades

- **Autenticação de Usuários**: Login e registro de usuários.
- **Gerenciamento de Tarefas**: Criar, editar, excluir e visualizar tarefas.
- **Dashboard Interativo**: Estatísticas, gráficos de barras e linhas para acompanhar o progresso das tarefas.
- **Filtros e Pesquisa**: Filtrar tarefas por status, prioridade e data.
- **Interface Responsiva**: Design adaptável para desktop e mobile.
- **Tema Personalizável**: Suporte a temas claros e escuros.
- **Sistema de Notificações**: Toast para feedback ao usuário.

## Tecnologias Utilizadas

- **Framework**: [Angular](https://angular.io/) - Framework para aplicações web.
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática.
- **Estilização**: [SCSS](https://sass-lang.com/) - Pré-processador CSS.
- **Estado e Dados**: [RxJS](https://rxjs.dev/) - Programação reativa para gerenciamento de estado.
- **HTTP Client**: [Angular HttpClient](https://angular.io/guide/http) - Cliente HTTP para requisições API.
- **Testes**: [Jasmine](https://jasmine.github.io/) e [Karma](https://karma-runner.github.io/) - Framework de testes.
- **Gráficos**: [Chart.js](https://www.chartjs.org/) - Biblioteca para gráficos.
- **Autenticação**: [JWT](https://jwt.io/) - Tokens JWT para autenticação.
- **Outros**: ESLint, Angular CLI para qualidade de código e desenvolvimento.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/task-manager-frontend-angular.git
   cd task-manager-frontend-angular
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Configure as variáveis necessárias no arquivo `src/environments/environment.ts` (ex: URL da API backend).

4. **Execute o servidor de desenvolvimento**:

   ```bash
   npm start
   ```

   Abra [http://localhost:4200](http://localhost:4200) no navegador para visualizar a aplicação.

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/                # Serviços, guards, interceptors e layouts
│   │   ├── guards/          # Guards de autenticação
│   │   ├── interceptors/    # Interceptors HTTP
│   │   ├── layout/          # Componentes de layout (Header, Sidebar, Dashboard Layout)
│   │   ├── models/          # Modelos de dados (Auth, Task)
│   │   └── services/        # Serviços (Auth, Task, Theme, Toast)
│   ├── features/            # Módulos de funcionalidades
│   │   ├── auth/            # Autenticação (Login, Register)
│   │   ├── dashboard/       # Dashboard com componentes (Stats, Charts)
│   │   └── tasks/           # Gerenciamento de tarefas (Form, List, Components)
│   ├── shared/              # Componentes compartilhados
│   │   └── components/      # UI components (Badge, Button, Input, etc.)
│   └── environments/        # Configurações de ambiente
├── public/                  # Arquivos estáticos
├── styles.scss              # Estilos globais
└── theme/                   # Variáveis de tema SCSS
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento.
- `npm run build` - Constrói a aplicação para produção.
- `npm run watch` - Constrói e observa mudanças para desenvolvimento.
- `npm test` - Executa os testes unitários com Karma.

## Testes

Os testes são escritos com Jasmine e executados via Karma. Incluem testes unitários para componentes, serviços e utilitários. Para executar os testes:

```bash
npm test
```

## Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato através do [GitHub Issues](https://github.com/seu-usuario/task-manager-frontend-angular/issues).

---

Desenvolvido com Angular.
