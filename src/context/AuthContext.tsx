import React, { createContext, useContext, useState } from 'react';
import type { UserRole } from '../types';

export const PRESET_USERS: UserRole[] = [
  {
    id: 'USR-01',
    name: 'Vikram Sengupta',
    role: 'LEAD_INVESTIGATOR',
    badge: 'Lead Fraud Investigator (L3)',
    email: 'v.sengupta@sentinel-upi.gov.in',
  },
  {
    id: 'USR-02',
    name: 'Ananya Deshmukh',
    role: 'RISK_ANALYST',
    badge: 'Risk Operations Analyst (L2)',
    email: 'a.deshmukh@sentinel-upi.gov.in',
  },
  {
    id: 'USR-03',
    name: 'Rajeshwer Rao',
    role: 'COMPLIANCE_OFFICER',
    badge: 'FIU-IND / RBI Compliance Officer',
    email: 'r.rao@fiuindia.gov.in',
  },
  {
    id: 'USR-04',
    name: 'Shreya Patel',
    role: 'AUDITOR',
    badge: 'External Security Auditor (Read-Only)',
    email: 'shreya@pwc-cyberaudit.com',
  },
];

interface AuthContextType {
  currentUser: UserRole;
  setCurrentUser: (user: UserRole) => void;
  canExecuteFreeze: boolean;
  canGenerateSAR: boolean;
  canClearAlert: boolean;
  canInjectAttacks: boolean;
  switchRole: (roleType: UserRole['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserRole>(PRESET_USERS[0]);

  const canExecuteFreeze = currentUser.role === 'LEAD_INVESTIGATOR';
  const canGenerateSAR = currentUser.role === 'LEAD_INVESTIGATOR' || currentUser.role === 'COMPLIANCE_OFFICER';
  const canClearAlert = currentUser.role === 'LEAD_INVESTIGATOR' || currentUser.role === 'RISK_ANALYST';
  const canInjectAttacks = currentUser.role === 'LEAD_INVESTIGATOR' || currentUser.role === 'RISK_ANALYST';

  const switchRole = (roleType: UserRole['role']) => {
    const found = PRESET_USERS.find(u => u.role === roleType);
    if (found) {
      setCurrentUser(found);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        canExecuteFreeze,
        canGenerateSAR,
        canClearAlert,
        canInjectAttacks,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
