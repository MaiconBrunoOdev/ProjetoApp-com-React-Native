# 📖 Exemplos de Uso - Sistema Maranhão Transportes

## 1. Usar o Contexto de Alunos

### Acessar dados e funções

```typescript
import { useStudents } from '../../context/StudentContext';

export const MyComponent = () => {
  const {
    students,        // Array de alunos
    trips,           // Array de viagens
    addStudent,      // Função
    updateStudent,   // Função
    deleteStudent,   // Função
    getDashboardStats, // Função
  } = useStudents();

  return (
    <View>
      <Text>Total de alunos: {students.length}</Text>
    </View>
  );
};
```

## 2. Adicionar um Novo Aluno Programaticamente

```typescript
const handleAddStudent = () => {
  const newStudent = {
    name: 'Pedro Santos',
    responsible: 'José Santos',
    phone: '(85) 99999-8888',
    address: 'Rua B, 456 - Camaçari',
    school: 'Escola Municipal Central',
    pickupTime: '06:30',
    returnTime: '11:30',
    status: 'active' as const,
  };

  addStudent(newStudent);
  Alert.alert('Sucesso', 'Aluno adicionado!');
};
```

## 3. Validar Formulário

```typescript
const validateForm = (form: FormData): boolean => {
  const errors: Partial<FormData> = {};

  if (!form.name.trim()) {
    errors.name = 'Nome obrigatório';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Telefone obrigatório';
  } else if (form.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Telefone inválido';
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

## 4. Buscar e Filtrar Alunos

```typescript
import { useMemo } from 'react';

const { students } = useStudents();
const [searchQuery, setSearchQuery] = useState('');

const filteredStudents = useMemo(() => {
  return students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [students, searchQuery]);
```

## 5. Criar uma Nova Viagem

```typescript
const handleCreateTrip = () => {
  const newTrip = {
    date: new Date().toISOString().split('T')[0],
    time: '06:30',
    students: [],
    maxCapacity: 4,
    currentCapacity: 0,
    type: 'pickup' as const,
    status: 'scheduled' as const,
    route: 'Rota Centro-Norte',
  };

  addTrip(newTrip);
};
```

## 6. Adicionar Aluno à Viagem com Verificação de Capacidade

```typescript
const handleAddStudentToTrip = (tripId: string, student: Student) => {
  const success = addStudentToTrip(tripId, student);

  if (success) {
    Alert.alert('Sucesso', `${student.name} adicionado!`);
  } else {
    Alert.alert('Erro', 'Viagem cheia! Máximo de 4 alunos.');
  }
};
```

## 7. Deletar Aluno com Confirmação

```typescript
const handleDelete = (id: string, name: string) => {
  Alert.alert(
    'Confirmar Exclusão',
    `Deseja deletar ${name}?`,
    [
      { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
      {
        text: 'Deletar',
        onPress: () => {
          deleteStudent(id);
          Alert.alert('Sucesso', 'Aluno removido!');
        },
        style: 'destructive',
      },
    ]
  );
};
```

## 8. Formatar Número de Telefone

```typescript
const formatPhone = (text: string) => {
  const cleaned = text.replace(/\D/g, '');

  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

// Usar em TextInput
<TextInput
  value={phone}
  onChangeText={(text) => setPhone(formatPhone(text))}
/>
```

## 9. Obter Estatísticas do Dashboard

```typescript
const { getDashboardStats } = useStudents();

const stats = useMemo(() => getDashboardStats(), [getDashboardStats]);

// stats.totalStudents
// stats.activeStudents
// stats.todaysTrips
// stats.pendingTrips
// stats.totalCapacity
// stats.usedCapacity
```

## 10. Renderizar Lista com FlatList

```typescript
<FlatList
  data={filteredStudents}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <StudentItem
      name={item.name}
      school={item.school}
      status={item.status}
      onPress={() => handleEdit(item)}
      onDelete={() => handleDelete(item.id, item.name)}
    />
  )}
  showsVerticalScrollIndicator={false}
  ListEmptyComponent={
    <View>
      <Text>Nenhum aluno encontrado</Text>
    </View>
  }
/>
```

## 11. Usar Componente StatCard

```typescript
import { StatCard } from '../../components/index';

<View style={{ flexDirection: 'row' }}>
  <StatCard
    label="Total de Alunos"
    value={stats.totalStudents}
    subLabel={`${stats.activeStudents} ativos`}
  />
  <StatCard
    label="Viagens Hoje"
    value={stats.todaysTrips}
    subLabel={`${stats.pendingTrips} pendentes`}
  />
</View>
```

## 12. Usar Componente TripCard

```typescript
import { TripCard } from '../../components/index';

<TripCard
  time="06:30"
  route="Rota Centro-Norte"
  students={2}
  capacity={4}
  status="scheduled"
  type="pickup"
  onPress={() => handleSelectTrip(trip)}
/>
```

## 13. Usar Modal para Adicionar Alunos

```typescript
<Modal
  visible={showAddStudentModal}
  transparent
  animationType="slide"
>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 16 }}>
      <SearchBar
        placeholder="Buscar aluno..."
        value={searchStudents}
        onChangeText={setSearchStudents}
      />

      <FlatList
        data={availableStudents}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addStudentToTrip(item)}>
            <StudentItem
              name={item.name}
              school={item.school}
              status={item.status}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  </View>
</Modal>
```

## 14. Atualizar Aluno

```typescript
const handleUpdateStudent = (id: string, updates: Partial<Student>) => {
  updateStudent(id, {
    ...updates,
    id, // mantém o ID
    createdAt: new Date().toISOString(), // ou usar a data original
  });

  Alert.alert('Sucesso', 'Aluno atualizado!');
};
```

## 15. Obter Viagens de Hoje

```typescript
const today = new Date().toISOString().split('T')[0];

const todaysTrips = useMemo(() => {
  return trips.filter((t) => t.date === today);
}, [trips]);

const pendingTrips = todaysTrips.filter(
  (t) => t.status === 'scheduled' || t.status === 'in_progress'
);
```

## 16. Usar Botões Customizados

```typescript
import { Button } from '../../components/index';

<Button
  title="Cadastrar Aluno"
  onPress={handleSubmit}
  variant="primary"
/>

<Button
  title="Deletar"
  onPress={handleDelete}
  variant="danger"
/>

<Button
  title="Cancelar"
  onPress={goBack}
  variant="secondary"
/>
```

## 17. Usar SearchBar

```typescript
import { SearchBar } from '../../components/index';

<SearchBar
  placeholder="Buscar aluno ou escola..."
  value={searchQuery}
  onChangeText={setSearchQuery}
/>
```

## 18. Navegar Entre Telas

```typescript
// Navegar para StudentForm com parâmetros
navigation.navigate('StudentForm', { student: studentData });

// Voltar
navigation.goBack();

// Navegar para abas
navigation.navigate('DashboardTab');
navigation.navigate('StudentsTab');
navigation.navigate('TripsTab');
```

## 19. Usar useCallback para Otimizar

```typescript
import { useCallback } from 'react';

const handleDelete = useCallback((id: string) => {
  deleteStudent(id);
  Alert.alert('Sucesso', 'Deletado!');
}, [deleteStudent]);

// Evita recriação desnecessária da função
```

## 20. Usar useMemo para Otimizar Cálculos

```typescript
const occupancyPercentage = useMemo(() => {
  if (totalCapacity === 0) return 0;
  return Math.round((usedCapacity / totalCapacity) * 100);
}, [totalCapacity, usedCapacity]);
```

---

## Checklist de Implementação

- [ ] Implementar AsyncStorage para persistência
- [ ] Conectar com backend real
- [ ] Adicionar autenticação
- [ ] Implementar push notifications
- [ ] Adicionar testes unitários
- [ ] Criar CI/CD pipeline
- [ ] Implementar error handling global
- [ ] Adicionar logging e analytics
- [ ] Criar versão web (opcional)
- [ ] Documentar API dos componentes
