import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { useStudents } from '../../context/StudentContext';
import { styles, COLORS, Button } from '../../components/index';
import type { Student } from '../../types';

interface StudentFormScreenProps {
  navigation: any;
  route?: any;
}

interface FormData {
  name: string;
  responsible: string;
  phone: string;
  address: string;
  school: string;
  pickupTime: string;
  returnTime: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  responsible: '',
  phone: '',
  address: '',
  school: '',
  pickupTime: '06:30',
  returnTime: '11:30',
};

const SCHOOLS = [
  'Escola Municipal Central',
  'Escola Estadual Central',
  'Escola Particular São José',
  'Escola Municipal Canto da Sereia',
  'Escola Estadual Getúlio Vargas',
];

export const StudentFormScreen: React.FC<StudentFormScreenProps> = ({
  navigation,
  route,
}) => {
  const { addStudent, updateStudent } = useStudents();
  const [form, setForm] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (route?.params?.student) {
      const student = route.params.student;
      setForm({
        name: student.name,
        responsible: student.responsible,
        phone: student.phone,
        address: student.address,
        school: student.school,
        pickupTime: student.pickupTime,
        returnTime: student.returnTime,
      });
      setIsEditing(true);
      setEditingId(student.id);
    }
  }, [route?.params?.student]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!form.responsible.trim()) {
      newErrors.responsible = 'Responsável é obrigatório';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }
    if (!form.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }
    if (!form.school.trim()) {
      newErrors.school = 'Escola é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente');
      return;
    }

    if (isEditing && editingId) {
      updateStudent(editingId, {
        ...form,
        id: editingId,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
    } else {
      addStudent({
        ...form,
        status: 'active',
      });
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
    }

    navigation.goBack();
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_STATE);
    setErrors({});
    if (isEditing) {
      navigation.goBack();
    }
  };

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (text: string) => {
    setForm({ ...form, phone: formatPhone(text) });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.safeArea}>
          <Text style={styles.header}>
            {isEditing ? '✏️ Editar Aluno' : '➕ Novo Aluno'}
          </Text>

          {/* Nome */}
          <Text style={styles.label}>Nome do Aluno *</Text>
          <TextInput
            style={[styles.input, errors.name && { borderColor: COLORS.danger }]}
            placeholder="Ex: João Silva"
            value={form.name}
            onChangeText={(text) => {
              setForm({ ...form, name: text });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholderTextColor="#999"
          />
          {errors.name && (
            <Text style={{ color: COLORS.danger, fontSize: 12, marginTop: 4 }}>
              {errors.name}
            </Text>
          )}

          {/* Responsável */}
          <Text style={styles.label}>Responsável *</Text>
          <TextInput
            style={[styles.input, errors.responsible && { borderColor: COLORS.danger }]}
            placeholder="Ex: Maria Silva"
            value={form.responsible}
            onChangeText={(text) => {
              setForm({ ...form, responsible: text });
              if (errors.responsible) setErrors({ ...errors, responsible: undefined });
            }}
            placeholderTextColor="#999"
          />
          {errors.responsible && (
            <Text style={{ color: COLORS.danger, fontSize: 12, marginTop: 4 }}>
              {errors.responsible}
            </Text>
          )}

          {/* Telefone */}
          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={[styles.input, errors.phone && { borderColor: COLORS.danger }]}
            placeholder="(85) 98765-4321"
            value={form.phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
          {errors.phone && (
            <Text style={{ color: COLORS.danger, fontSize: 12, marginTop: 4 }}>
              {errors.phone}
            </Text>
          )}

          {/* Endereço */}
          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={[styles.input, errors.address && { borderColor: COLORS.danger }]}
            placeholder="Ex: Rua A, 123 - Bairro"
            value={form.address}
            onChangeText={(text) => {
              setForm({ ...form, address: text });
              if (errors.address) setErrors({ ...errors, address: undefined });
            }}
            placeholderTextColor="#999"
          />
          {errors.address && (
            <Text style={{ color: COLORS.danger, fontSize: 12, marginTop: 4 }}>
              {errors.address}
            </Text>
          )}

          {/* Escola */}
          <Text style={styles.label}>Escola *</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: errors.school ? COLORS.danger : COLORS.border,
              borderRadius: 6,
              marginVertical: 8,
              backgroundColor: '#FFFFFF',
              maxHeight: 150,
            }}
          >
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
              {SCHOOLS.map((school) => (
                <TouchableOpacity
                  key={school}
                  onPress={() => {
                    setForm({ ...form, school });
                    if (errors.school) setErrors({ ...errors, school: undefined });
                  }}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.border,
                  }}
                >
                  <Text
                    style={{
                      color:
                        form.school === school ? COLORS.primary : COLORS.text,
                      fontWeight: form.school === school ? '600' : '400',
                      fontSize: 14,
                    }}
                  >
                    {school}
                    {form.school === school && ' ✓'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {errors.school && (
            <Text style={{ color: COLORS.danger, fontSize: 12, marginTop: 4 }}>
              {errors.school}
            </Text>
          )}

          {/* Horários */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              marginTop: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Hora de Ida *</Text>
              <View
                style={[
                  styles.card,
                  {
                    alignItems: 'center',
                    marginVertical: 0,
                    paddingVertical: 12,
                  },
                ]}
              >
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>
                  {form.pickupTime}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Hora de Volta *</Text>
              <View
                style={[
                  styles.card,
                  {
                    alignItems: 'center',
                    marginVertical: 0,
                    paddingVertical: 12,
                  },
                ]}
              >
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>
                  {form.returnTime}
                </Text>
              </View>
            </View>
          </View>

          {/* Botões */}
          <View style={{ marginTop: 32, marginBottom: 32, gap: 12 }}>
            <Button
              title={isEditing ? 'Salvar Alterações' : 'Cadastrar Aluno'}
              onPress={handleSubmit}
              variant="primary"
            />
            <Button
              title={isEditing ? 'Cancelar' : 'Limpar Formulário'}
              onPress={handleReset}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
