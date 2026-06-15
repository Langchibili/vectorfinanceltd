export const ROLES = {
  DIRECTOR: 'director',
  CEO: 'ceo',
  LOAN_ADMIN: 'Loan Admin',
  COLLATERAL_INSPECTOR: 'Collateral Inspector'
}

export const ROLE_PERMISSIONS = {
  [ROLES.DIRECTOR]: {
    canViewAllLoans: true,
    canViewStats: true,
    canAdministrateLoan: true,
    canSign: true,
    canInitial: true,
    canDisburse: true,
    canApprove: true,
    canReject: true,
    canMarkComplete: true,
    canMarkDefault: true
  },
  [ROLES.CEO]: {
    canViewAllLoans: true,
    canViewStats: true,
    canAdministrateLoan: true,
    canSign: true,
    canInitial: true,
    canDisburse: true,
    canApprove: true,
    canReject: true,
    canMarkComplete: true,
    canMarkDefault: true
  },
  [ROLES.LOAN_ADMIN]: {
    canViewAllLoans: true,
    canViewStats: false,
    canAdministrateLoan: true,
    canSign: false,
    canInitial: false,
    canAddAppendix: true,
    canRequestApproval: true,
    canReject: true,
    canMarkComplete: true,
    canMarkDefault: true
  },
  [ROLES.COLLATERAL_INSPECTOR]: {
    canViewAllLoans: false,
    canViewStats: false,
    canAdministrateLoan: false,
    canViewCollateral: true
  }
}

// tolerant resolver: accepts exact-case role or lowercase variants
export function getPermissions(role) {
  if (!role) return {}
  if (ROLE_PERMISSIONS[role]) return ROLE_PERMISSIONS[role]
  const lower = role.toLowerCase()
  const key = Object.keys(ROLE_PERMISSIONS).find(k => k.toLowerCase() === lower)
  if (key) return ROLE_PERMISSIONS[key]
  if (['loan admin', 'loan_admin', 'loanadmin'].includes(lower)) return ROLE_PERMISSIONS[ROLES.LOAN_ADMIN]
  if (['collateral inspector', 'collateral_inspector'].includes(lower)) return ROLE_PERMISSIONS[ROLES.COLLATERAL_INSPECTOR]
  if (lower === 'director') return ROLE_PERMISSIONS[ROLES.DIRECTOR]
  if (lower === 'ceo') return ROLE_PERMISSIONS[ROLES.CEO]
  return {}
}
