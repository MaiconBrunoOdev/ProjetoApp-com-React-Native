import React, { useMemo } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useStudents } from '../../context/StudentContext';
import { styles, StatCard, TripCard, COLORS } from '../../components/index';

interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  navigation,
}) => {
  const { getDashboardStats, trips } = useStudents();
  const stats = useMemo(() => getDashboardStats(), [getDashboardStats, trips]);

  const todaysTrips = trips.filter(
    (t) => t.date === new Date().toISOString().split('T')[0]
  );

  const pendingTrips = todaysTrips.filter(
    (t) => t.status === 'scheduled' || t.status === 'in_progress'
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.safeArea}>
          {/* Header */}
          <Text style={styles.header}>📊 Dashboard</Text>

          {/* Estatísticas principais */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.text,
              marginBottom: 12,
            }}
          >
            Resumo do Dia
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
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

          <View style={{ flexDirection: 'row', marginBottom: 24 }}>
            <StatCard
              label="Ocupação"
              value={`${stats.usedCapacity}/${stats.totalCapacity}`}
              subLabel={`${Math.round((stats.usedCapacity / (stats.totalCapacity || 1)) * 100)}%`}
            />
            <StatCard
              label="Vagas Livres"
              value={Math.max(0, stats.totalCapacity - stats.usedCapacity)}
              subLabel="Disponíveis"
            />
          </View>

          {/* Viagens de Hoje */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.text,
              }}
            >
              Próximas Viagens
            </Text>
            {pendingTrips.length > 0 && (
              <TouchableOpacity onPress={() => navigation.navigate('TripManager')}>
                <Text style={{ color: COLORS.primary, fontWeight: '600' }}>
                  Ver Todas
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {pendingTrips.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={pendingTrips.slice(0, 3)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TripCard
                  time={item.time}
                  route={item.route || 'Rota padrão'}
                  students={item.currentCapacity}
                  capacity={item.maxCapacity}
                  status={item.status}
                  type={item.type}
                  onPress={() => navigation.navigate('TripManager', { tripId: item.id })}
                />
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
              <Text style={{ fontSize: 16, color: '#999', marginBottom: 12 }}>
                Nenhuma viagem agendada para hoje
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('TripManager')}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: '600',
                    fontSize: 14,
                  }}
                >
                  Criar Viagem
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Ações Rápidas */}
          <View style={{ marginTop: 24, marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.text,
                marginBottom: 12,
              }}
            >
              Ações Rápidas
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { flex: 1, marginRight: 8, backgroundColor: COLORS.primary },
                ]}
                onPress={() => navigation.navigate('StudentForm')}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>+ Novo Aluno</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  { flex: 1, marginLeft: 8, backgroundColor: COLORS.secondary },
                ]}
                onPress={() => navigation.navigate('TripManager')}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.buttonText, { color: COLORS.text }]}
                >
                  + Nova Viagem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
