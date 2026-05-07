# 📂 Estrutura Completa do Projeto

```
ProjetoMtransportes/
├── 📄 App.tsx                          ← App principal com navegação
├── 📄 package.json                    ← Dependências do projeto
├── 📄 app.json                        ← Configuração Expo
├── 📄 babel.config.js                 ← Config Babel
├── 📄 tsconfig.json                   ← Config TypeScript
├── 📄 .gitignore                      ← Git ignore
│
├── 📚 DOCUMENTAÇÃO
│   ├── 📄 README.md                   ← Overview e features
│   ├── 📄 QUICKSTART.md               ← Começar em 5 minutos
│   ├── 📄 DEVELOPMENT.md              ← Guia de desenvolvimento
│   ├── 📄 API.md                      ← Integração e endpoints
│   ├── 📄 EXAMPLES.md                 ← Exemplos de código
│   └── 📄 BEST_PRACTICES.md           ← Boas práticas
│
└── 📁 src/
    │
    ├── 📁 screens/                   ← 4 Telas principais
    │   ├── Dashboard/
    │   │   └── index.tsx             ← Resumo do dia
    │   ├── StudentList/
    │   │   └── index.tsx             ← Lista de alunos
    │   ├── StudentForm/
    │   │   └── index.tsx             ← Cadastro/edição
    │   └── TripManager/
    │       └── index.tsx             ← Gerenciar viagens
    │
    ├── 📁 components/                ← Componentes reutilizáveis
    │   └── index.tsx                 ← StatCard, StudentItem, TripCard, Button, etc
    │
    ├── 📁 context/                   ← State global
    │   └── StudentContext.tsx        ← Context + Provider + Hook
    │
    ├── 📁 types/                     ← TypeScript types
    │   └── index.ts                  ← Student, Trip, DashboardStats
    │
    ├── 📁 services/                  ← Serviços de API (futuro)
    │   └── (vazio - pronto para integração)
    │
    └── 📁 utils/                     ← Funções utilitárias
        └── (vazio - pronto para helpers)
```

## 🎯 Arquivos Principais por Funcionalidade

### Core Application
- **App.tsx** - Navegação principal (Bottom Tabs)
- **src/context/StudentContext.tsx** - Estado global e lógica de negócio

### Telas
- **Dashboard** - Estatísticas e ações rápidas
- **StudentList** - CRUD de alunos com busca/filtros
- **StudentForm** - Cadastro e edição com validações
- **TripManager** - Viagens e associação de alunos (máx 4)

### Componentes
- **StatCard** - Cards com estatísticas
- **StudentItem** - Item de aluno com ações
- **TripCard** - Card de viagem com barra de progresso
- **SearchBar** - Barra de busca
- **Button** - Botão customizável (primary/danger/secondary)

### Tipos
- **Student** - Aluno com campos completos
- **Trip** - Viagem com array de alunos
- **DashboardStats** - Estatísticas do dia
- **StudentContextType** - Interface do Context

## 📊 Fluxo de Dados

```
┌─────────────────────┐
│   App.tsx           │  ← Navigação + StudentProvider
└──────────┬──────────┘
           │
           ↓
┌─────────────────────────────────────────────┐
│  StudentContext (Context API)               │  ← Estado global
│  - students: Student[]                      │
│  - trips: Trip[]                            │
│  - addStudent, updateStudent, deleteStudent │
│  - addTrip, updateTrip, deleteTrip          │
│  - addStudentToTrip, removeStudentFromTrip  │
└──────────┬──────────────────────────────────┘
           │
           ↓ useStudents() hook
           │
    ┌──────┴──────┬──────────┬──────────┐
    ↓             ↓          ↓          ↓
Dashboard    StudentList  StudentForm  TripManager
    │             │          │          │
    └─────────────┴──────────┴──────────┘
              Componentes Reutilizáveis
```

## 🔗 Dependências Principais

```json
{
  "react": "18.2.0",
  "react-native": "0.72.0",
  "expo": "~49.0.0",
  "@react-navigation/native": "^6.1.8",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/stack": "^6.3.19",
  "react-native-gesture-handler": "~2.12.0"
}
```

## 🚀 Scripts Disponíveis

```bash
npm start      # Inicia servidor (Expo)
npm run android # Abre no Android
npm run ios    # Abre no iOS
npm test       # Executa testes (se configurado)
```

## 📱 Navegação

```
Bottom Tab Navigation
├── DashboardTab
│   └── DashboardStack
│       ├── Dashboard (home)
│       ├── StudentForm (navegado)
│       └── TripManager (navegado)
├── StudentsTab
│   └── StudentListStack
│       ├── StudentList (home)
│       └── StudentForm (navegado)
└── TripsTab
    └── TripManager
```

## 💾 Persistência (Atualmente)

- **Em Memória**: Estado perdido ao recarregar
- **Próximo**: Implementar AsyncStorage

## 🔐 Validações Implementadas

✅ Nome obrigatório
✅ Telefone com formato (85) 98765-4321
✅ Máximo 4 alunos por viagem
✅ Campos obrigatórios
✅ Confirmação antes de deletar

## 🎨 Design Tokens

```javascript
COLORS = {
  primary: '#2E7D32',      // Ações principais
  secondary: '#FFC107',    // Ações secundárias
  background: '#F5F5F5',   // Fundo da app
  text: '#333333',         // Texto padrão
  border: '#CCCCCC',       // Bordas
  success: '#4CAF50',      // Status ativo
  warning: '#FF9800',      // Avisos
  danger: '#F44336',       // Perigos/deletar
}
```

## 📈 Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| Arquivos TypeScript | 7 |
| Linhas de Código | ~2000 |
| Componentes | 6 principais |
| Telas | 4 |
| Tipos | 5 |
| Documentação | 6 arquivos |
| Capacidade por viagem | 4 alunos |

## 🎯 Próximas Fases

### Fase 1: Persistência (1 semana)
- [ ] AsyncStorage integration
- [ ] Salvar dados localmente
- [ ] Recuperar ao iniciar

### Fase 2: Backend (2 semanas)
- [ ] Setup Node.js + MongoDB
- [ ] Endpoints REST
- [ ] Autenticação JWT

### Fase 3: Features (2 semanas)
- [ ] Push notifications
- [ ] GPS tracking
- [ ] Relatórios

### Fase 4: Produção (1 semana)
- [ ] Deploy Expo
- [ ] App Store/Google Play
- [ ] Monitoring

## 🆘 Onde Começar

1. **Ler** → [QUICKSTART.md](QUICKSTART.md) (5 min)
2. **Explorar** → Rodar `npm start` (10 min)
3. **Entender** → [DEVELOPMENT.md](DEVELOPMENT.md) (20 min)
4. **Codificar** → [EXAMPLES.md](EXAMPLES.md) + [BEST_PRACTICES.md](BEST_PRACTICES.md)

## 📞 Estrutura de Pastas - Por Propósito

### Regras de Negócio
→ `src/context/StudentContext.tsx`

### Apresentação
→ `src/screens/` e `src/components/`

### Tipos e Interfaces
→ `src/types/`

### Integração com API (futuro)
→ `src/services/`

### Funções Auxiliares (futuro)
→ `src/utils/`

---

**Projeto organizado, código escalável, documentação completa!** ✨
