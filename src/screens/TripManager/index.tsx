import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import { useStudents } from '../../context/StudentContext';
import { styles, TripCard, StudentItem, COLORS, Button, SearchBar } from '../../components/index';
import type { Trip, Student } from '../../types';

interface TripManagerScreenProps {
  navigation: any;
  route?: any;
}

export const TripManagerScreen: React.FC<TripManagerScreenProps> = ({
  navigation,
  route,
}) => {
  const { trips, students, addTrip, updateTrip, deleteTrip, addStudentToTrip, removeStudentFromTrip } =
    useStudents();

  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [searchStudents, setSearchStudents] = useState('');
  const [newTripForm, setNewTripForm] = useState({
    time: '06:30',
    type: 'pickup' as 'pickup' | 'return',
    route: 'Rota Centro-Norte',
  });

  const today = new Date().toISOString().split('T')[0];

  const todaysTrips = useMemo(() => {
    return trips.filter((t) => t.date === today);
  }, [trips, today]);

  const availableStudents = useMemo(() => {
    return students
      .filter((s) => s.status === 'active')
      .filter((s) => !selectedTrip || !selectedTrip.students.some((ts) => ts.id === s.id))
      .filter((s) =>
        s.name.toLowerCase().includes(searchStudents.toLowerCase())
      );
  }, [students, selectedTrip, searchStudents]);

  const handleCreateTrip = () => {
    if (!newTripForm.time || !newTripForm.route) {
      Alert.alert('Erro', 'Preencha todos os campos da viagem');
      return;
    }

    const newTrip: Omit<Trip, 'id'> = {
      date: today,
      time: newTripForm.time,
      students: [],
      maxCapacity: 4,
      currentCapacity: 0,
      type: newTripForm.type,
      status: 'scheduled',
      route: newTripForm.route,
    };

    addTrip(newTrip);
    setNewTripForm({
      time: '06:30',
      type: 'pickup',
      route: 'Rota Centro-Norte',
    });
    setShowNewTripModal(false);
    Alert.alert('Sucesso', 'Viagem criada com sucesso!');
  };

  const handleAddStudentToTrip = (student: Student) => {
    if (!selectedTrip) return;

    const success = addStudentToTrip(selectedTrip.id, student);
    if (success) {
      setSearchStudents('');
      Alert.alert('Sucesso', `${student.name} adicionado à viagem!`);
      // Atualizar o selectedTrip
      const updated = trips.find((t) => t.id === selectedTrip.id);
      if (updated) setSelectedTrip(updated);
    } else {
      Alert.alert('Erro', 'Esta viagem já está cheia (máximo 4 alunos)');
    }
  };

  const handleRemoveStudentFromTrip = (studentId: string) => {
    if (!selectedTrip) return;

    removeStudentFromTrip(selectedTrip.id, studentId);
    const updated = trips.find((t) => t.id === selectedTrip.id);
    if (updated) setSelectedTrip(updated);
  };

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja deletar esta viagem?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            deleteTrip(tripId);
            setSelectedTrip(null);
            Alert.alert('Sucesso', 'Viagem removida com sucesso!');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleUpdateTripStatus = (tripId: string, newStatus: string) => {
    updateTrip(tripId, { status: newStatus as any });
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
          <Text style={styles.header}>🚌 Viagens de Hoje</Text>
          <TouchableOpacity
            onPress={() => setShowNewTripModal(true)}
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

        {selectedTrip ? (
          // Detalhes da viagem selecionada
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.card,
                {
                  marginBottom: 16,
                  backgroundColor: COLORS.primary,
                },
              ]}
            >
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                    {selectedTrip.type === 'pickup' ? '🚌 Ida' : '🚌 Volta'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      marginTop: 8,
                    }}
                  >
                    {selectedTrip.time}
                  </Text>
                  <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 4 }}>
                    {selectedTrip.route}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 12,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
                      {selectedTrip.currentCapacity}/{selectedTrip.maxCapacity}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: 8,
                    }}
                  >
                    {selectedTrip.status === 'scheduled'
                      ? '📋 Agendada'
                      : selectedTrip.status === 'in_progress'
                      ? '🚗 Em Andamento'
                      : '✅ Concluída'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Status da Viagem */}
            <Text style={styles.label}>Status da Viagem</Text>
            <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
              {(['scheduled', 'in_progress', 'completed'] as const).map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => handleUpdateTripStatus(selectedTrip.id, status)}
                  style={[
                    {
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 6,
                      flex: 1,
                      alignItems: 'center',
                    },
                    selectedTrip.status === status
                      ? { backgroundColor: COLORS.primary }
                      : { backgroundColor: COLORS.border, opacity: 0.5 },
                  ]}
                >
                  <Text
                    style={{
                      color: selectedTrip.status === status ? '#fff' : COLORS.text,
                      fontWeight: '600',
                      fontSize: 12,
                    }}
                  >
                    {status === 'scheduled'
                      ? 'Agendar'
                      : status === 'in_progress'
                      ? 'Iniciar'
                      : 'Concluir'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Alunos da Viagem */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={styles.label}>Alunos ({selectedTrip.students.length}/4)</Text>
              {selectedTrip.currentCapacity < selectedTrip.maxCapacity && (
                <TouchableOpacity
                  onPress={() => setShowAddStudentModal(true)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: COLORS.primary,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>
                    + Adicionar
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {selectedTrip.students.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                data={selectedTrip.students}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleRemoveStudentFromTrip(item.id)}
                    activeOpacity={0.7}
                  >
                    <StudentItem
                      name={item.name}
                      school={item.school}
                      status={item.status}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={[
                  styles.card,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 40,
                  },
                ]}
              >
                <Text style={{ fontSize: 14, color: '#999' }}>
                  Nenhum aluno nesta viagem
                </Text>
              </View>
            )}

            {/* Ações */}
            <View style={{ marginTop: 24, marginBottom: 32, gap: 8 }}>
              <Button
                title="← Voltar para Lista"
                onPress={() => setSelectedTrip(null)}
              />
              <Button
                title="Deletar Viagem"
                onPress={() => handleDeleteTrip(selectedTrip.id)}
                variant="danger"
              />
            </View>

            {/* Modal para adicionar aluno */}
            <Modal
              visible={showAddStudentModal}
              transparent
              animationType="slide"
              onRequestClose={() => setShowAddStudentModal(false)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'flex-end',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    paddingBottom: 32,
                    maxHeight: '80%',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Text style={styles.header}>Adicionar Aluno</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowAddStudentModal(false);
                        setSearchStudents('');
                      }}
                    >
                      <Text style={{ fontSize: 24, color: COLORS.text }}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <SearchBar
                    placeholder="Buscar aluno..."
                    value={searchStudents}
                    onChangeText={setSearchStudents}
                  />

                  {availableStudents.length > 0 ? (
                    <FlatList
                      scrollEnabled={true}
                      data={availableStudents}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            handleAddStudentToTrip(item);
                            setShowAddStudentModal(false);
                          }}
                          activeOpacity={0.7}
                        >
                          <StudentItem
                            name={item.name}
                            school={item.school}
                            status={item.status}
                          />
                        </TouchableOpacity>
                      )}
                      nestedScrollEnabled={true}
                      style={{ maxHeight: 300 }}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        paddingVertical: 40,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: '#999' }}>
                        {searchStudents
                          ? 'Nenhum aluno encontrado'
                          : 'Todos os alunos já estão nesta viagem'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Modal>
          </ScrollView>
        ) : (
          // Lista de viagens
          <FlatList
            data={todaysTrips}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedTrip(item)}
                activeOpacity={0.7}
              >
                <TripCard
                  time={item.time}
                  route={item.route || 'Rota padrão'}
                  students={item.currentCapacity}
                  capacity={item.maxCapacity}
                  status={item.status}
                  type={item.type}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
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
                  Nenhuma viagem agendada para hoje
                </Text>
                <Button
                  title="Criar Primeira Viagem"
                  onPress={() => setShowNewTripModal(true)}
                />
              </View>
            }
          />
        )}
      </View>

      {/* Modal para criar nova viagem */}
      <Modal
        visible={showNewTripModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewTripModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingTop: 16,
              paddingHorizontal: 16,
              paddingBottom: 32,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <Text style={styles.header}>Nova Viagem</Text>
              <TouchableOpacity
                onPress={() => setShowNewTripModal(false)}
              >
                <Text style={{ fontSize: 24, color: COLORS.text }}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Tipo de Viagem</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              {(['pickup', 'return'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setNewTripForm({ ...newTripForm, type })}
                  style={[
                    {
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 6,
                      flex: 1,
                      alignItems: 'center',
                    },
                    newTripForm.type === type
                      ? { backgroundColor: COLORS.primary }
                      : { backgroundColor: COLORS.border, opacity: 0.3 },
                  ]}
                >
                  <Text
                    style={{
                      color: newTripForm.type === type ? '#fff' : COLORS.text,
                      fontWeight: '600',
                    }}
                  >
                    {type === 'pickup' ? '🚌 Ida' : '🚌 Volta'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Horário</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={newTripForm.time}
              onChangeText={(text) => setNewTripForm({ ...newTripForm, time: text })}
            />

            <Text style={styles.label}>Rota</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Rota Centro-Norte"
              value={newTripForm.route}
              onChangeText={(text) => setNewTripForm({ ...newTripForm, route: text })}
            />

            <Button
              title="Criar Viagem"
              onPress={handleCreateTrip}
              style={{ marginTop: 24 }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
