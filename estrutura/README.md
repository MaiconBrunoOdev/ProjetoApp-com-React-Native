# 🚌 Sistema Maranhão Transportes

Sistema mobile para gestão logística de transporte escolar, desenvolvido com React Native + Expo.

## 📋 Descrição do Projeto

O **Sistema Maranhão Transportes** é uma solução digital para automatizar o controle de transporte escolar na rede de ensino de Camaçari. A aplicação substitui o controle manual por uma interface mobile intuitiva e eficiente.

### Core Business Rules
- **Capacidade máxima**: 4 alunos por viagem
- **Público-alvo**: Alunos da rede escolar de Camaçari
- **Controle**: Horários de ida e volta dos alunos

## 🎯 Funcionalidades Principais

### 1. Dashboard
- Resumo do dia com estatísticas
- Total de alunos ativos
- Viagens agendadas vs. pendentes
- Taxa de ocupação das viagens
- Acesso rápido às principais ações

### 2. Gestão de Alunos
- Cadastro completo de alunos (Nome, Responsável, Contato, Endereço, Escola)
- Listagem com busca e filtros
- Edição e exclusão de alunos
- Ativar/desativar alunos
- Validação de dados em tempo real

### 3. Gerenciador de Viagens
- Criação de viagens com data, horário e rota
- Adição de até 4 alunos por viagem
- Controle de status (Agendada, Em Andamento, Concluída)
- Visualização de ocupação em tempo real
- Remoção de alunos das viagens

### 4. Organização de Dados
- Persistência local de dados (AsyncStorage)
- Contexto global para gerenciar estado
- Tipos TypeScript para segurança

## 📁 Estrutura do Projeto

```
ProjetoMtransportes/
├── src/
│   ├── screens/           # Telas da aplicação
│   │   ├── Dashboard/     # Tela inicial com resumo
│   │   ├── StudentList/   # Lista de alunos
│   │   ├── StudentForm/   # Formulário de cadastro
│   │   └── TripManager/   # Gerenciador de viagens
│   ├── components/        # Componentes reutilizáveis
│   ├── context/          # Context API para estado global
│   ├── types/            # Tipos TypeScript
│   ├── services/         # Serviços de API (futura integração)
│   └── utils/            # Funções utilitárias
├── App.tsx               # Componente raiz com navegação
├── app.json              # Configuração Expo
├── babel.config.js       # Configuração Babel
├── package.json          # Dependências
└── README.md             # Documentação
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 14+
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`

### Passos de Instalação

1. **Clone o repositório ou navegue até a pasta do projeto**
   ```bash
   cd ProjetoMtransportes
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Execute em um simulador ou dispositivo físico**
   - Para iOS: Pressione `i`
   - Para Android: Pressione `a`
   - Para web: Pressione `w`

## 📱 Como Usar

### Dashboard
1. Abra a aba "Dashboard"
2. Visualize o resumo do dia com estatísticas
3. Acesse as ações rápidas para criar alunos ou viagens

### Gerenciar Alunos
1. Abra a aba "Alunos"
2. Veja a lista de alunos cadastrados
3. Use a barra de busca ou filtros para localizar
4. Toque em um aluno para editá-lo
5. Use os botões de ação para ativar/desativar ou deletar

### Criar Novo Aluno
1. Vá para "Dashboard" ou "Alunos"
2. Clique no botão "+" ou "Novo Aluno"
3. Preencha o formulário com os dados do aluno
4. Selecione a escola na lista
5. Clique em "Cadastrar Aluno"

### Gerenciar Viagens
1. Abra a aba "Viagens"
2. Visualize as viagens agendadas
3. Clique em uma viagem para ver detalhes
4. Use "Adicionar" para incluir alunos
5. Mude o status conforme necessário

### Criar Nova Viagem
1. Na aba "Viagens", clique no botão "+"
2. Selecione o tipo (Ida ou Volta)
3. Defina o horário e rota
4. Clique "Criar Viagem"
5. Adicione alunos clicando em "Adicionar"

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: #2E7D32 (Verde)
- **Secundária**: #FFC107 (Âmbar)
- **Sucesso**: #4CAF50 (Verde claro)
- **Aviso**: #FF9800 (Laranja)
- **Perigo**: #F44336 (Vermelho)
- **Fundo**: #F5F5F5 (Cinza claro)

### Componentes Reutilizáveis
- `StatCard`: Exibe estatísticas
- `StudentItem`: Cartão de aluno
- `TripCard`: Cartão de viagem
- `SearchBar`: Barra de busca
- `Button`: Botão customizável

## 🔐 Segurança e Validações

- Validação de telefone em tempo real
- Campos obrigatórios com feedback visual
- Confirmação antes de deletar dados
- Estados visuais para feedback ao usuário
- Limites respeitados (máximo 4 alunos por viagem)

## 📊 Estrutura de Dados

### Student
```typescript
{
  id: string;
  name: string;
  responsible: string;
  phone: string;
  address: string;
  school: string;
  pickupTime: string;
  returnTime: string;
  status: 'active' | 'inactive';
  createdAt: string;
}
```

### Trip
```typescript
{
  id: string;
  date: string;
  time: string;
  students: Student[];
  maxCapacity: number (4);
  currentCapacity: number;
  type: 'pickup' | 'return';
  status: 'scheduled' | 'in_progress' | 'completed';
  route?: string;
}
```

## 🚀 Futuras Melhorias

- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Persistência em banco de dados
- [ ] Notificações push
- [ ] Rastreamento GPS de viagens
- [ ] Relatórios e estatísticas avançadas
- [ ] Modo offline
- [ ] Integração com WhatsApp para comunicação
- [ ] Fotos dos alunos
- [ ] Histórico de viagens

## 🛠️ Stack Tecnológico

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para criar apps React Native
- **React Navigation**: Navegação entre telas
- **Context API**: Gerenciamento de estado global
- **TypeScript**: Tipagem estática
- **AsyncStorage**: Persistência local de dados

## 📝 Scripts Disponíveis

```bash
npm start      # Inicia o servidor de desenvolvimento
npm run android # Abre no Android
npm run ios    # Abre no iOS
npm test       # Executa testes (se configurado)
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação do Expo: https://docs.expo.dev/
2. Consulte a documentação do React Native: https://reactnative.dev/
3. Veja exemplos no diretório `examples/` (se disponível)

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e comerciais internos.

---

**Desenvolvido com ❤️ para Sistema Maranhão Transportes**
