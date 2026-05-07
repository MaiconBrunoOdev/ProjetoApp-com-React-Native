// Tipos para o sistema de transportes

export interface Student {
  id: string;
  name: string;
  responsible: string;
  phone: string;
  address: string;
  school: string;
  pickupTime: string;
  returnTime: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Trip {
  id: string;
  date: string;
  time: string;
  students: Student[];
  maxCapacity: number;
  currentCapacity: number;
  type: 'pickup' | 'return';
  status: 'scheduled' | 'in_progress' | 'completed';
  route?: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  todaysTrips: number;
  pendingTrips: number;
  totalCapacity: number;
  usedCapacity: number;
}

export interface StudentContextType {
  students: Student[];
  trips: Trip[];
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addStudentToTrip: (tripId: string, student: Student) => boolean;
  removeStudentFromTrip: (tripId: string, studentId: string) => void;
  getDashboardStats: () => DashboardStats;
}
