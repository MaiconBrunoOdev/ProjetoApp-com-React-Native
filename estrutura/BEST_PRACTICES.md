# 🎓 Boas Práticas - Sistema Maranhão Transportes

## 📌 Convenções de Código

### Nomenclatura

```typescript
// ✅ Bom
const handleAddStudent = () => {}
const isStudentActive = true
const MAX_CAPACITY = 4
const StudentListScreen = () => {}

// ❌ Evitar
const add_student = () => {}
const active = true
const max = 4
const studentListScreen = () => {}
```

### Estrutura de Componentes

```typescript
// ✅ Estrutura ideal
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useStudents } from '../../context/StudentContext';
import { styles, COLORS } from '../../components/index';

interface ComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ title, onPress }) => {
  const [state, setState] = useState('');
  const { students } = useStudents();

  const handleAction = useCallback(() => {
    setState('novo');
    if (onPress) onPress();
  }, [onPress]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};
```

## ⚡ Performance

### 1. Use useCallback para Handlers

```typescript
// ✅ Bom - função não é recriada a cada render
const handleDelete = useCallback((id: string) => {
  deleteStudent(id);
}, [deleteStudent]);

// ❌ Ruim - função é recriada a cada render
const handleDelete = (id: string) => {
  deleteStudent(id);
};
```

### 2. Use useMemo para Cálculos Pesados

```typescript
// ✅ Bom - calcula apenas quando students mudar
const activeStudents = useMemo(() => {
  return students.filter(s => s.status === 'active');
}, [students]);

// ❌ Ruim - calcula a cada render
const activeStudents = students.filter(s => s.status === 'active');
```

### 3. Use FlatList com ScrollEnabled=false

```typescript
// ✅ Bom - dentro de ScrollView
<ScrollView>
  <FlatList scrollEnabled={false} data={items} />
</ScrollView>

// ❌ Ruim - nested scrolling
<FlatList data={items} />
```

### 4. Evite Props Desnecessárias

```typescript
// ✅ Bom - apenas o necessário
<StudentItem name={item.name} school={item.school} />

// ❌ Ruim - passa todo objeto
<StudentItem student={item} />
```

## 🔒 Segurança

### 1. Validação de Entrada

```typescript
// ✅ Bom
const validatePhone = (phone: string): boolean => {
  return /^(\(\d{2}\))\s9\d{4}-\d{4}$/.test(phone);
};

// ❌ Ruim
const phone = userInput; // Sem validação
```

### 2. Never Trust User Input

```typescript
// ✅ Bom
const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 100);
};

// ❌ Ruim
const text = form.name; // Pode conter caracteres inválidos
```

### 3. Use Tipos TypeScript

```typescript
// ✅ Bom - tipos definidos
interface Student {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

// ❌ Ruim - any
const student: any = data;
```

## 🧪 Testabilidade

### 1. Funções Puras

```typescript
// ✅ Bom - retorna valor previsível
const calculateOccupancy = (current: number, max: number): number => {
  return Math.round((current / max) * 100);
};

// ❌ Ruim - tem side effects
const updateOccupancy = (trip: Trip) => {
  trip.percentage = Math.round((trip.current / trip.max) * 100);
};
```

### 2. Dependências Explícitas

```typescript
// ✅ Bom - dependências claras
const memoValue = useMemo(() => {
  return students.filter(s => s.school === school);
}, [students, school]);

// ❌ Ruim - falta dependência
const memoValue = useMemo(() => {
  return students.filter(s => s.school === school);
}, [students]);
```

## 📝 Documentação

### 1. Documente Componentes Complexos

```typescript
/**
 * Tela para gerenciar viagens do dia
 * 
 * Features:
 * - Criar nova viagem
 * - Adicionar até 4 alunos por viagem
 * - Mudar status (agendada → em andamento → concluída)
 * - Remover alunos da viagem
 * 
 * @component
 * @example
 * return <TripManagerScreen navigation={navigation} route={route} />
 */
export const TripManagerScreen: React.FC<TripManagerScreenProps> = ({
  navigation,
  route,
}) => {
  // ...
};
```

### 2. Documente Funções Críticas

```typescript
/**
 * Adiciona um aluno à viagem respeitando limite de capacidade
 * 
 * @param tripId - ID da viagem
 * @param student - Dados do aluno
 * @returns true se adicionado com sucesso, false se viagem está cheia
 * 
 * @example
 * const success = addStudentToTrip('trip-123', student);
 * if (!success) Alert.alert('Erro', 'Viagem cheia!');
 */
const addStudentToTrip = useCallback(
  (tripId: string, student: Student): boolean => {
    // implementação
  },
  []
);
```

## 🎨 Consistência de UI

### 1. Use Tokens de Design

```typescript
// ✅ Bom - tokens centralizados
const COLORS = {
  primary: '#2E7D32',
  secondary: '#FFC107',
  danger: '#F44336',
};

// ❌ Ruim - cores hardcoded
<View style={{ backgroundColor: '#2E7D32' }}>
  <Text style={{ color: '#FFF' }}>OK</Text>
</View>
```

### 2. Use Componentes Reutilizáveis

```typescript
// ✅ Bom
<StatCard label="Total" value={count} />
<Button title="Salvar" onPress={handleSave} />

// ❌ Ruim
<View style={styles.card}>
  <Text>{count}</Text>
</View>
<TouchableOpacity onPress={handleSave}>
  <Text>Salvar</Text>
</TouchableOpacity>
```

### 3. Padding/Spacing Consistente

```typescript
// ✅ Bom - use constantes
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

style={{ padding: SPACING.md }}

// ❌ Ruim - valores aleatórios
style={{ padding: 12 }}
style={{ margin: 19 }}
```

## 🔄 Error Handling

### 1. Sempre Trate Erros

```typescript
// ✅ Bom
const loadData = async () => {
  try {
    const data = await fetchStudents();
    setStudents(data);
  } catch (error) {
    console.error('Erro ao carregar:', error);
    Alert.alert('Erro', 'Não foi possível carregar os dados');
  }
};

// ❌ Ruim - sem tratamento
const loadData = async () => {
  const data = await fetchStudents();
  setStudents(data);
};
```

### 2. Use Feedback Visual

```typescript
// ✅ Bom
{loading && <ActivityIndicator />}
{error && <ErrorMessage text={error} />}
{data.length === 0 && <EmptyState />}

// ❌ Ruim - sem feedback
{data.map(item => <Item key={item.id} />)}
```

## 🚀 Escalabilidade

### 1. Separe Responsabilidades

```typescript
// ✅ Bom - separação clara
// src/services/studentService.ts
export const studentService = {
  create: async (student) => { /* API call */ },
  update: async (id, student) => { /* API call */ },
};

// src/context/StudentContext.tsx
const addStudent = useCallback((student) => {
  const newStudent = await studentService.create(student);
  setStudents([...students, newStudent]);
}, []);

// ❌ Ruim - lógica misturada
const addStudent = () => {
  const response = fetch('/api/students', { /* config */ });
  setStudents([...students, response]);
};
```

### 2. Use Feature Folders (futuro)

```
src/
├── features/
│   ├── students/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   └── types.ts
│   ├── trips/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   └── types.ts
│   └── auth/
│       ├── screens/
│       ├── services/
│       └── types.ts
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── App.tsx
```

## 📊 Logging

### 1. Use Logging Estruturado

```typescript
// ✅ Bom
const logger = {
  info: (msg: string, data?: any) => console.log(`[INFO] ${msg}`, data),
  error: (msg: string, error?: any) => console.error(`[ERROR] ${msg}`, error),
  warn: (msg: string, data?: any) => console.warn(`[WARN] ${msg}`, data),
};

logger.info('Aluno adicionado', { studentId: student.id });

// ❌ Ruim
console.log('aluno adicionado');
```

### 2. Remove Logs em Produção

```typescript
// ✅ Bom
if (__DEV__) {
  console.log('Debug info:', data);
}

// ❌ Ruim
console.log('Debug info:', data); // Fica em produção
```

## ✅ Checklist de Code Review

- [ ] Tipagem TypeScript completa
- [ ] Sem `any` types
- [ ] Nomes descritivos
- [ ] Funções pequenas e focadas
- [ ] Sem console.logs
- [ ] Tratamento de erros
- [ ] Validação de dados
- [ ] Performance otimizada (useCallback, useMemo)
- [ ] Componentes reutilizáveis
- [ ] Documentação clara
- [ ] Sem warnings
- [ ] Responsive design
- [ ] Acessibilidade básica
- [ ] Sem memory leaks

## 🎯 Git Workflow

```bash
# Criar branch para feature
git checkout -b feature/nova-feature

# Commits descritivos
git commit -m "feat: adicionar campo de email no formulário"
git commit -m "fix: corrigir validação de telefone"
git commit -m "refactor: reorganizar componentes de formulário"

# Push e Pull Request
git push origin feature/nova-feature
```

## 📚 Referências

- [React Best Practices](https://react.dev/learn)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

---

**Mantendo a qualidade do código, mantemos a qualidade do projeto!** 🎯
