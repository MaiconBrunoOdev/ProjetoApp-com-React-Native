# ⚡ Quick Start - Sistema Maranhão Transportes

## 🚀 5 Minutos para Começar

### 1. Instalar Dependências
```bash
cd ProjetoMtransportes
npm install
```

### 2. Instalar Expo CLI (uma única vez)
```bash
npm install -g expo-cli
```

### 3. Iniciar o App
```bash
npm start
```

Você verá um menu como este:
```
  To open the app:
     › Android: Press 'a'
    › iOS: Press 'i'
    › Web: Press 'w'
    › Go to http://localhost:19002/
```

### 4. Escanear QR Code
- **Android**: Abra Expo Go → escaneie o QR code
- **iOS**: Use a câmera nativa → escaneie o QR code
- **Web**: Pressione 'w'

## 📱 Primeiros Passos no App

### 1. Ver Dashboard
- Primeira aba mostra estatísticas do dia
- 3 alunos pré-cadastrados
- 1 viagem de exemplo

### 2. Adicionar Novo Aluno
1. Na aba "Alunos" ou "Dashboard"
2. Clique no botão "+"
3. Preencha o formulário
4. Selecione a escola
5. Clique "Cadastrar Aluno"

### 3. Criar Viagem
1. Na aba "Viagens"
2. Clique no botão "+"
3. Escolha: Ida ou Volta
4. Defina horário e rota
5. Clique "Criar Viagem"

### 4. Adicionar Alunos à Viagem
1. Selecione uma viagem
2. Clique "Adicionar"
3. Busque e selecione aluno
4. Máximo 4 alunos por viagem

## 🎯 Features Principais

### ✅ Dashboard
- Resumo de alunos e viagens
- Ações rápidas
- Estatísticas em tempo real

### ✅ Gestão de Alunos
- Criar, editar, deletar
- Busca e filtros
- Ativar/desativar status

### ✅ Gerenciador de Viagens
- Criar viagens (Ida/Volta)
- Adicionar até 4 alunos
- Gerenciar status
- Visualizar ocupação

## 📁 Estrutura Rápida

```
src/
├── screens/         ← 4 telas principais
├── components/      ← Componentes reutilizáveis
├── context/         ← Gerenciamento de estado
└── types/          ← TypeScript types
```

## 🔥 Dados de Teste

Alunos pré-carregados:
1. **João Silva** - Escola Municipal Central - 06:30
2. **Ana Costa** - Escola Estadual Central - 06:45
3. **Lucas Oliveira** - Escola Municipal Central - 06:30

Viagem pré-carregada:
- **Ida às 06:30** - Rota Centro-Norte - 2/4 alunos

## 🛑 Troubleshooting Rápido

### Problema: Port já está em uso
```bash
expo start --clear  # Limpa o cache e tenta novamente
```

### Problema: Metro Bundler crashed
```bash
npm install
expo start -c
```

### Problema: Dispositivo não conecta
1. Verifique WiFi
2. Escaneie novamente o QR
3. Reinicie Expo Go

## 📞 Documentação Completa

- **README.md** - Visão geral e features
- **DEVELOPMENT.md** - Arquitetura e desenvolvimento
- **API.md** - Integração e endpoints
- **EXAMPLES.md** - Exemplos de código

## 🎨 Temas e Cores

```
🟢 Verde: #2E7D32 (Principal)
🟡 Âmbar: #FFC107 (Secundário)
🟢 Verde Claro: #4CAF50 (Sucesso)
🔴 Vermelho: #F44336 (Perigo)
```

## 🚀 Próximos Passos

1. **Testar as 4 telas** - Veja como tudo funciona
2. **Modificar dados de teste** - Edit o StudentContext
3. **Adicionar novas features** - Siga padrão do código
4. **Integrar com API** - Ver API.md
5. **Deploy** - Usar Expo EAS Build

## 📊 Capacidade

| Item | Limite |
|------|--------|
| Alunos por viagem | 4 |
| Tipos de viagem | 2 (Ida, Volta) |
| Status da viagem | 3 (Agendada, Em Andamento, Concluída) |
| Escolas | 5 (customizáveis) |

## 🔐 Validações

✅ Nome obrigatório
✅ Responsável obrigatório
✅ Telefone com formato (85) 98765-4321
✅ Endereço obrigatório
✅ Escola deve ser selecionada
✅ Máximo 4 alunos por viagem

## 💾 Dados

Atualmente em **memória** (limpa ao recarregar)

Para persistir:
```bash
npm install @react-native-async-storage/async-storage
# Veja DEVELOPMENT.md para implementação
```

## 🎓 Aprender

- [React Native](https://reactnative.dev)
- [Expo](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript](https://www.typescriptlang.org)

## ✨ Arquitetura

```
App.tsx (Navigation)
    ↓
StudentProvider (Context)
    ↓
3 Bottom Tabs (Dashboard, Alunos, Viagens)
    ↓
Screens + Components
```

## 🎯 Próximas Implementações

- [ ] AsyncStorage persistence
- [ ] Firebase authentication
- [ ] Backend API integration
- [ ] Push notifications
- [ ] GPS tracking
- [ ] Offline mode
- [ ] Reports/Statistics
- [ ] Unit tests

---

## ⏱️ Tempo Estimado

| Tarefa | Tempo |
|--------|-------|
| Instalar | 5 min |
| Rodar app | 2 min |
| Explorar features | 10 min |
| Adicionar aluno | 3 min |
| Criar viagem | 2 min |

**Total: ~22 minutos para dominar o básico**

---

**Pronto para começar?** Execute `npm start` 🚀
