import React, { createContext, useState, useCallback, ReactNode } from 'react';
import {
  Student,
  Trip,
  DashboardStats,
  StudentContextType,
} from '../types';

export const StudentContext = createContext<StudentContextType | undefined>(
  undefined
);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [students, setStudents] = useState<Student[]>([
    // Dados de exemplo
    {
      id: '1',
      name: 'João Silva',
      responsible: 'Maria Silva',
      phone: '(85) 98765-4321',
      address: 'Rua A, 123 - Camaçari',
      school: 'Escola Municipal Central',
      pickupTime: '06:30',
      returnTime: '11:30',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Ana Costa',
      responsible: 'Pedro Costa',
      phone: '(85) 99876-5432',
      address: 'Rua B, 456 - Camaçari',
      school: 'Escola Estadual Central',
      pickupTime: '06:45',
      returnTime: '11:45',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Lucas Oliveira',
      responsible: 'Carla Oliveira',
      phone: '(85) 98888-7777',
      address: 'Rua C, 789 - Camaçari',
      school: 'Escola Municipal Central',
      pickupTime: '06:30',
      returnTime: '11:30',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 'trip-1',
      date: new Date().toISOString().split('T')[0],
      time: '06:30',
      students: [students[0], students[2]],
      maxCapacity: 4,
      currentCapacity: 2,
      type: 'pickup',
      status: 'scheduled',
      route: 'Rota Centro-Norte',
    },
  ]);

  const addStudent = useCallback((student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setStudents((prev) => [...prev, newStudent]);
  }, []);

  const updateStudent = useCallback((id: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      )
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    // Remove aluno de todas as viagens
    setTrips((prev) =>
      prev.map((trip) => ({
        ...trip,
        students: trip.students.filter((s) => s.id !== id),
        currentCapacity: Math.max(
          0,
          trip.students.filter((s) => s.id !== id).length
        ),
      }))
    );
  }, []);

  const addTrip = useCallback((trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      ...trip,
      id: `trip-${Date.now()}`,
    };
    setTrips((prev) => [...prev, newTrip]);
  }, []);

  const updateTrip = useCallback((id: string, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === id
          ? {
              ...trip,
              ...updates,
              currentCapacity: updates.students
                ? updates.students.length
                : trip.currentCapacity,
            }
          : trip
      )
    );
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  }, []);

  const addStudentToTrip = useCallback(
    (tripId: string, student: Student): boolean => {
      let canAdd = false;

      setTrips((prev) =>
        prev.map((trip) => {
          if (trip.id === tripId) {
            if (trip.currentCapacity < trip.maxCapacity) {
              canAdd = true;
              return {
                ...trip,
                students: [...trip.students, student],
                currentCapacity: trip.currentCapacity + 1,
              };
            }
          }
          return trip;
        })
      );

      return canAdd;
    },
    []
  );

  const removeStudentFromTrip = useCallback(
    (tripId: string, studentId: string) => {
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === tripId
            ? {
                ...trip,
                students: trip.students.filter((s) => s.id !== studentId),
                currentCapacity: Math.max(
                  0,
                  trip.students.filter((s) => s.id !== studentId).length
                ),
              }
            : trip
        )
      );
    },
    []
  );

  const getDashboardStats = useCallback((): DashboardStats => {
    const activeStudents = students.filter((s) => s.status === 'active');
    const todaysTrips = trips.filter(
      (t) => t.date === new Date().toISOString().split('T')[0]
    );
    const pendingTrips = todaysTrips.filter(
      (t) => t.status === 'scheduled' || t.status === 'in_progress'
    );
    const totalCapacity = todaysTrips.reduce((sum, t) => sum + t.maxCapacity, 0);
    const usedCapacity = todaysTrips.reduce((sum, t) => sum + t.currentCapacity, 0);

    return {
      totalStudents: students.length,
      activeStudents: activeStudents.length,
      todaysTrips: todaysTrips.length,
      pendingTrips: pendingTrips.length,
      totalCapacity,
      usedCapacity,
    };
  }, [students, trips]);

  const value: StudentContextType = {
    students,
    trips,
    addStudent,
    updateStudent,
    deleteStudent,
    addTrip,
    updateTrip,
    deleteTrip,
    addStudentToTrip,
    removeStudentFromTrip,
    getDashboardStats,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = React.useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents deve ser usado dentro de StudentProvider');
  }
  return context;
};
