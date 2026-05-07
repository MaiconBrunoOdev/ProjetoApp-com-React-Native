# 🔌 Integração e API - Sistema Maranhão Transportes

## 📡 Arquitetura de Integração Planejada

```
┌─────────────┐
│ App Mobile  │
│ (React N.)  │
└──────┬──────┘
       │ API REST/GraphQL
       ↓
┌─────────────────────────┐
│   Backend (Node.js)     │
│  - Express/NestJS       │
│  - Autenticação         │
│  - Negócio Logic        │
└──────┬──────────────────┘
       │
       ↓
┌─────────────────────────┐
│   Database (MongoDB)    │
│  - Students             │
│  - Trips                │
│  - Users                │
└─────────────────────────┘
```

## 🔐 Autenticação

### Firebase Authentication (Recomendado)

```typescript
import { initializeAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Login
const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Erro no login:', error);
  }
};

// Logout
const logoutUser = async () => {
  await auth.signOut();
};
```

### JWT Token (Alternativa)

```typescript
// Armazenar token
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token: string) => {
  await AsyncStorage.setItem('authToken', token);
};

const getToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Usar em requisições
const api = axios.create({
  baseURL: 'https://api.maranhao-transportes.com',
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📡 API REST Endpoints

### Base URL
```
https://api.maranhao-transportes.com/v1
```

### Autenticação
```
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh-token
```

### Alunos
```
GET    /students                    # Listar alunos
GET    /students/:id                # Obter um aluno
POST   /students                    # Criar aluno
PUT    /students/:id                # Atualizar aluno
DELETE /students/:id                # Deletar aluno
GET    /students/search?q=termo     # Buscar alunos
```

### Viagens
```
GET    /trips                       # Listar viagens
GET    /trips/:id                   # Obter viagem
POST   /trips                       # Criar viagem
PUT    /trips/:id                   # Atualizar viagem
DELETE /trips/:id                   # Deletar viagem
GET    /trips/date/:date            # Viagens de um dia
```

### Viagens - Alunos
```
POST   /trips/:id/students/:studentId   # Adicionar aluno à viagem
DELETE /trips/:id/students/:studentId   # Remover aluno da viagem
```

### Relatórios
```
GET    /reports/daily?date=2026-05-06       # Relatório diário
GET    /reports/monthly?month=2026-05       # Relatório mensal
GET    /reports/student/:id                 # Histórico de aluno
```

## 📝 Modelos de Requisição/Resposta

### Criar Aluno
**Request:**
```json
POST /students
{
  "name": "João Silva",
  "responsible": "Maria Silva",
  "phone": "(85) 98765-4321",
  "address": "Rua A, 123 - Camaçari",
  "school": "Escola Municipal Central",
  "pickupTime": "06:30",
  "returnTime": "11:30"
}
```

**Response:**
```json
{
  "id": "student_123",
  "name": "João Silva",
  "responsible": "Maria Silva",
  "phone": "(85) 98765-4321",
  "address": "Rua A, 123 - Camaçari",
  "school": "Escola Municipal Central",
  "pickupTime": "06:30",
  "returnTime": "11:30",
  "status": "active",
  "createdAt": "2026-05-06T10:00:00Z",
  "updatedAt": "2026-05-06T10:00:00Z"
}
```

### Criar Viagem
**Request:**
```json
POST /trips
{
  "date": "2026-05-06",
  "time": "06:30",
  "type": "pickup",
  "route": "Rota Centro-Norte",
  "maxCapacity": 4,
  "status": "scheduled"
}
```

**Response:**
```json
{
  "id": "trip_456",
  "date": "2026-05-06",
  "time": "06:30",
  "type": "pickup",
  "route": "Rota Centro-Norte",
  "maxCapacity": 4,
  "currentCapacity": 0,
  "students": [],
  "status": "scheduled",
  "createdAt": "2026-05-06T10:00:00Z",
  "updatedAt": "2026-05-06T10:00:00Z"
}
```

### Adicionar Aluno à Viagem
**Request:**
```json
POST /trips/trip_456/students/student_123
```

**Response:**
```json
{
  "success": true,
  "message": "Aluno adicionado com sucesso",
  "trip": {
    "id": "trip_456",
    "date": "2026-05-06",
    "time": "06:30",
    "type": "pickup",
    "route": "Rota Centro-Norte",
    "maxCapacity": 4,
    "currentCapacity": 1,
    "students": [
      {
        "id": "student_123",
        "name": "João Silva",
        "school": "Escola Municipal Central"
      }
    ],
    "status": "scheduled"
  }
}
```

## 🔗 Implementar Serviço de API

### Criar `src/services/api.ts`

```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.maranhao-transportes.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado - fazer logout
      await AsyncStorage.removeItem('authToken');
      // Redirecionar para login
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Criar Services

```typescript
// src/services/studentService.ts
import api from './api';
import { Student } from '../types';

export const studentService = {
  getAll: async () => {
    const response = await api.get('/students');
    return response.data;
  },

  create: async (student: Omit<Student, 'id' | 'createdAt'>) => {
    const response = await api.post('/students', student);
    return response.data;
  },

  update: async (id: string, student: Partial<Student>) => {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  },

  search: async (query: string) => {
    const response = await api.get(`/students/search`, {
      params: { q: query },
    });
    return response.data;
  },
};
```

## 🔄 Sincronizar com Backend

### Modificar Context para usar API

```typescript
// src/context/StudentContext.tsx
export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar dados do backend
  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar aluno
  const addStudent = useCallback(
    async (student: Omit<Student, 'id' | 'createdAt'>) => {
      try {
        setLoading(true);
        const newStudent = await studentService.create(student);
        setStudents((prev) => [...prev, newStudent]);
      } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <StudentContext.Provider value={{ students, loading, addStudent, loadStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
```

## 📊 WebSocket para Atualizações em Tempo Real

### Implementar Socket.io

```typescript
import io from 'socket.io-client';

const socket = io('https://api.maranhao-transportes.com', {
  auth: {
    token: await AsyncStorage.getItem('authToken'),
  },
});

// Escutar atualizações de viagens
socket.on('trip:updated', (trip) => {
  console.log('Viagem atualizada:', trip);
  // Atualizar estado local
});

// Emitir eventos
socket.emit('trip:status-changed', {
  tripId: 'trip_456',
  status: 'in_progress',
});
```

## 🗂️ Estrutura de Banco de Dados (MongoDB)

### Collections

```javascript
// students
{
  _id: ObjectId,
  name: String,
  responsible: String,
  phone: String,
  address: String,
  school: String,
  pickupTime: String,
  returnTime: String,
  status: 'active' | 'inactive',
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}

// trips
{
  _id: ObjectId,
  date: Date,
  time: String,
  type: 'pickup' | 'return',
  route: String,
  maxCapacity: Number,
  currentCapacity: Number,
  students: [ObjectId], // referência para students
  status: 'scheduled' | 'in_progress' | 'completed',
  driverId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}

// users
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  role: 'admin' | 'driver' | 'parent',
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Fases de Implementação

### Fase 1: MVP (Semana 1-2)
- [x] Estrutura base
- [ ] Integração com mock API
- [ ] Autenticação básica
- [ ] Sincronização de dados

### Fase 2: Backend (Semana 3-4)
- [ ] Setup do Node.js + MongoDB
- [ ] Implementar CRUD endpoints
- [ ] Autenticação com JWT
- [ ] Validações no backend

### Fase 3: Features Avançadas (Semana 5-6)
- [ ] Notificações push
- [ ] WebSockets
- [ ] Rastreamento GPS
- [ ] Relatórios

### Fase 4: Produção (Semana 7-8)
- [ ] Testes automatizados
- [ ] Deploy (AWS/Azure)
- [ ] Monitoring
- [ ] Documentação

## 🧪 Testar API Localmente

### Usando Postman

1. Importe a coleção de endpoints
2. Configure ambiente com `BASE_URL`
3. Teste cada endpoint
4. Verifique respostas e erros

### Usando cURL

```bash
# Criar aluno
curl -X POST http://localhost:3000/api/v1/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "responsible": "Maria Silva",
    "phone": "(85) 98765-4321",
    "address": "Rua A, 123",
    "school": "Escola Municipal",
    "pickupTime": "06:30",
    "returnTime": "11:30"
  }'

# Listar alunos
curl http://localhost:3000/api/v1/students
```

## 📞 Suporte para Integração

Questões comuns:
1. **CORS errors**: Configure CORS no backend
2. **Timeout**: Aumente timeout do axios
3. **Token expirado**: Implemente refresh token
4. **Offline mode**: Use AsyncStorage como cache

---

**Próximo passo**: Implementar backend Node.js + Express
