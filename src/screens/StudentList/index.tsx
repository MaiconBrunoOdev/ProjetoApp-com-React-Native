import React, { useMemo, useState } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useStudents } from '../../context/StudentContext';
import { styles, SearchBar, StudentItem, COLORS, Button } from '../../components/index';

interface StudentListScreenProps {
  navigation: any;
}

export const StudentListScreen: React.FC<StudentListScreenProps> = ({
  navigation,
}) => {
  const { students, deleteStudent, updateStudent } = useStudents();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.school.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterStatus === 'all' || student.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [students, searchQuery, filterStatus]);

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja deletar ${name}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            deleteStudent(id);
            Alert.alert('Sucesso', 'Aluno removido com sucesso!');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = (student: any) => {
    navigation.navigate('StudentForm', { student });
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateStudent(id, { status: newStatus });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.safeArea}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text style={styles.header}>👥 Alunos</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('StudentForm')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, color: '#fff' }}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de Busca */}
        <SearchBar
          placeholder="Buscar aluno ou escola..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Filtros */}
        <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                {
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 2,
                },
                filterStatus === status
                  ? {
                      backgroundColor: COLORS.primary,
                      borderColor: COLORS.primary,
                    }
                  : {
                      backgroundColor: 'transparent',
                      borderColor: COLORS.border,
                    },
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={{
                  color:
                    filterStatus === status ? '#fff' : COLORS.text,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                {status === 'all' ? 'Todos' : status === 'active' ? 'Ativos' : 'Inativos'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de Alunos */}
        {filteredStudents.length > 0 ? (
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <StudentItem
                  name={item.name}
                  school={item.school}
                  status={item.status}
                  onPress={() => handleEdit(item)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    marginHorizontal: 8,
                    marginBottom: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      handleToggleStatus(item.id, item.status)
                    }
                    style={[
                      styles.button,
                      {
                        flex: 1,
                        backgroundColor:
                          item.status === 'active'
                            ? COLORS.warning
                            : COLORS.success,
                        paddingVertical: 8,
                      },
                    ]}
                  >
                    <Text style={styles.buttonText}>
                      {item.status === 'active' ? 'Desativar' : 'Ativar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id, item.name)}
                    style={[
                      styles.button,
                      {
                        flex: 1,
                        backgroundColor: COLORS.danger,
                        paddingVertical: 8,
                      },
                    ]}
                  >
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={[
              styles.card,
              {
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 60,
                marginTop: 32,
              },
            ]}
          >
            <Text style={{ fontSize: 16, color: '#999', marginBottom: 16 }}>
              {searchQuery || filterStatus !== 'all'
                ? 'Nenhum aluno encontrado'
                : 'Nenhum aluno cadastrado'}
            </Text>
            {!searchQuery && filterStatus === 'all' && (
              <Button
                title="Cadastrar Primeiro Aluno"
                onPress={() => navigation.navigate('StudentForm')}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
