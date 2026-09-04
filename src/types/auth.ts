export type UserRole = 'operator' | 'spv' | 'chief';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  roleTitle: string;
  badgeNumber: string;
  shift?: string;
}

export const PRESET_USERS: { user: AuthUser; pin: string }[] = [
  {
    user: {
      id: 'usr_op_1',
      username: 'operator.cctv',
      role: 'operator',
      roleTitle: 'Petugas CCTV SSC',
      badgeNumber: 'SSC-OPR-01',
      shift: 'Shift Reguler'
    },
    pin: '1234'
  },
  {
    user: {
      id: 'usr_spv_1',
      username: 'spv.operasional',
      role: 'spv',
      roleTitle: 'SPV Operasional',
      badgeNumber: 'SSC-SPV-01',
      shift: 'General'
    },
    pin: '1234'
  },
  {
    user: {
      id: 'usr_chief_1',
      username: 'chief.security',
      role: 'chief',
      roleTitle: 'Sr. Chief Operasional',
      badgeNumber: 'SSC-CHF-01',
      shift: 'Management'
    },
    pin: '1234'
  }
];
