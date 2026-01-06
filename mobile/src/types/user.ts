export type UserRole = 'admin' | 'coordinator' | 'teacher' | 'parent' | 'student';

export type AppUser = {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
};
