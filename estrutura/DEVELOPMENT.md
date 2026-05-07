# 🔧 Guia de Desenvolvimento - Sistema Maranhão Transportes

## 📌 Setup Inicial

### 1. Instalar Dependências

```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

### 2. Instalar Expo CLI (se necessário)

```bash
npm install -g expo-cli
```

### 3. Iniciar o Projeto

```bash
npm start
```

Você verá um QR code no terminal. Escaneie com o seu telefone:
- **iOS**: Use a câmera nativa
- **Android**: Use o Expo Go app

## 🏗️ Arquitetura

### Context API Pattern

O projeto utiliza **Context API + Hooks** para gerenciamento de estado global:

```typescript
// src/context/StudentContext.tsx
- StudentContext: Contexto principal
- StudentProvider: Provider que envolve a aplicação
- useStudents(): Hook customizado para acessar o contexto
```

### Estrutura de Telas

```
Navegação por Abas (Tab Navigation)
├── Dashboard
│   └── Stack com StudentForm e TripManager
├── Alunos
│   └── Stack com StudentForm
└── Viagens
    └── TripManager
```

## 📚 Componentes Principais

### 1. **DashboardScreen** (`src/screens/Dashboard/index.tsx`)
- Exibe estatísticas do dia
- Resume viagens pendentes
- Oferece ações rápidas

### 2. **StudentListScreen** (`src/screens/StudentList/index.tsx`)
- Lista todos os alunos
- Busca e filtros
- CRUD de alunos

### 3. **StudentFormScreen** (`src/screens/StudentForm/index.tsx`)
- Formulário para adicionar/editar alunos
- Validações em tempo real
- Picker para seleção de escola

### 4. **TripManagerScreen** (`src/screens/TripManager/index.tsx`)
- Gerencia viagens do dia
- Modal para adicionar alunos
- Controle de status

## 🎯 Fluxos de Dados

### Adicionar Aluno

```
StudentForm → useStudents.addStudent()
           → StudentContext.students (atualizado)
           → StudentList re-renderiza
           → TripManager vê novos alunos
```

### Criar Viagem

```
TripManager → useStudents.addTrip()
           → StudentContext.trips (atualizado)
           → Dashboard mostra nova viagem
           → TripManager atualiza lista
```

### Adicionar Aluno à Viagem

```
TripManager → useStudents.addStudentToTrip()
           → Verifica capacidade (máx 4)
           → Atualiza trip.students
           → Atualiza trip.currentCapacity
           → Modal fecha
           → selectedTrip atualiza
```

## 💾 Persistência de Dados

Atualmente, os dados são armazenados em **memória** (state local).

### Para Implementar AsyncStorage (futuro):

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar dados
const saveStudents = async (students: Student[]) => {
  await AsyncStorage.setItem('students', JSON.stringify(students));
};

// Recuperar dados
const loadStudents = async () => {
  const data = await AsyncStorage.getItem('students');
  return data ? JSON.parse(data) : [];
};
```

## 🎨 Customização de Estilos

### Cores Principais (`src/components/index.tsx`)

```typescript
const COLORS = {
  primary: '#2E7D32',      // Verde
  secondary: '#FFC107',    // Âmbar
  background: '#F5F5F5',   // Cinza
  text: '#333333',         // Texto
  border: '#CCCCCC',       // Bordas
  success: '#4CAF50',      // Sucesso
  warning: '#FF9800',      // Aviso
  danger: '#F44336',       // Perigo
};
```

### Adicionar Nova Cor

1. Adicione a cor no objeto `COLORS`
2. Use via `COLORS.newColor`
3. Crie um `badge` ou componente para a cor

## 🧪 Testando

### Testar com Dados de Exemplo

Os dados iniciais já estão preenchidos no `StudentContext`:

```typescript
const [students, setStudents] = useState<Student[]>([
  { id: '1', name: 'João Silva', ... },
  { id: '2', name: 'Ana Costa', ... },
  { id: '3', name: 'Lucas Oliveira', ... },
]);
```

### Cenários para Testar

1. **Dashboard**: Verifique estatísticas
2. **Adicionar Aluno**: Preencha o formulário
3. **Buscar Aluno**: Use a barra de busca
4. **Criar Viagem**: Adicione ida/volta
5. **Adicionar à Viagem**: Teste limite de 4 alunos
6. **Deletar**: Confirme deleção

## 🐛 Debugging

### Ver Logs

```typescript
console.log('Contexto:', useStudents());
```

### React DevTools

Instale a extensão do React DevTools para ver a tree de componentes.

## 📦 Build para Produção

### Expo EAS Build

```bash
eas build --platform android
eas build --platform ios
```

### Criar APK local

```bash
eas build --local --platform android
```

## 🚀 Deployment

1. Configure no `app.json`:
   ```json
   {
     "expo": {
       "name": "Sistema Maranhão Transportes",
       "slug": "sistema-maranhao-transportes"
     }
   }
   ```

2. Implemente autenticação com Firebase
3. Configure backend API
4. Teste em dispositivos reais
5. Faça upload para App Store/Google Play

## 📋 Checklist de Implementação

- [x] Estrutura base do projeto
- [x] Context API com StudentContext
- [x] 4 Telas principais
- [x] CRUD de alunos
- [x] CRUD de viagens
- [x] Validações de formulário
- [x] Navegação por abas
- [ ] Integração com API backend
- [ ] Autenticação de usuários
- [ ] Persistência com AsyncStorage
- [ ] Notificações push
- [ ] Rastreamento GPS
- [ ] Relatórios
- [ ] Testes automatizados

## 🤝 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
2. Commit suas mudanças: `git commit -m 'Add nova feature'`
3. Push para a branch: `git push origin feature/nova-feature`
4. Abra um Pull Request

## 📖 Referências Úteis

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript React](https://www.typescriptlang.org/docs/handbook/jsx.html)

## 💡 Dicas Importantes

1. **Sempre use `useCallback` em handlers**: Evita re-renders desnecessários
2. **Use `useMemo` para listas**: Melhora performance
3. **Valide dados no contexto**: Não confie apenas no frontend
4. **Teste em dispositivos reais**: Emuladores não são 100% confiáveis
5. **Documente componentes complexos**: Ajuda na manutenção

## 🆘 Troubleshooting

### Problema: "Cannot find module"
```bash
npm install
rm -rf node_modules
npm install
```

### Problema: "Metro bundler crashed"
```bash
expo start -c  # -c = clear cache
```

### Problema: "Device not connecting"
1. Verifique a conexão WiFi
2. Escaneie novamente o QR code
3. Reinicie o Expo Go

---

**Última atualização**: Maio 2026
