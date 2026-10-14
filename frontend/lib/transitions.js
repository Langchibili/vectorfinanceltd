// export const STATUSES = [
//   'initiated',
//   'pending-collateral-addition',
//   'pending-collateral-inspection',
//   'collateral-inspection',
//   'request-approval',
//   'accepted',
//   'pending-approval',
//   'approved',
//   'rejected',
//   'disbursed',
//   'completed',
//   'defaulted'
// ]

// /*
//   TRANSITIONS maps currentStatus => [
//     {
//       action: 'action-key',
//       allowedRoles: [ 'director' | 'ceo' | 'Loan Admin' | 'Collateral Inspector' | 'system' ],
//       targetStatus: 'new-status',
//       needsConfirmation: true|false,      // optional: UI may prompt for reason/confirm
//       requiresPayload: ['reason','attachments'] // optional required payload keys for server
//     }
//   ]
// */
// export const TRANSITIONS = {
//   initiated: [
//     { action: 'request-collateral', allowedRoles: ['Loan Admin'], targetStatus: 'pending-collateral-addition', needsConfirmation: false }
//   ],
//   'pending-collateral-addition': [
//     { action: 'client-added-collateral', allowedRoles: ['system'], targetStatus: 'pending-collateral-inspection', needsConfirmation: false }
//   ],
//   'pending-collateral-inspection': [
//     { action: 'request-inspection', allowedRoles: ['Loan Admin'], targetStatus: 'collateral-inspection', needsConfirmation: false },
//     { action: 'reject', allowedRoles: ['Loan Admin'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
//   ],
//   'collateral-inspection': [
//     { action: 'inspect-and-submit', allowedRoles: ['Collateral Inspector'], targetStatus: 'request-approval', needsConfirmation: false, requiresPayload: ['inspectionReport'] },
//     { action: 'request-approval', allowedRoles: ['Loan Admin'], targetStatus: 'request-approval', needsConfirmation: false },
//   ],
//   'request-approval': [
//     { action: 'accept', allowedRoles: ['director', 'ceo'], targetStatus: 'accepted', needsConfirmation: true },
//     { action: 'reject', allowedRoles: ['director', 'ceo'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
//   ],
//   accepted: [
//     { action: 'client-signs', allowedRoles: ['system'], targetStatus: 'pending-approval', needsConfirmation: false }
//   ],
//   'pending-approval': [
//     { action: 'add-appendix', allowedRoles: ['Loan Admin'], targetStatus: 'pending-approval', needsConfirmation: false, requiresPayload: ['appendix'] },
//     // { action: 'approve', allowedRoles: ['director', 'ceo'], targetStatus: 'approved', needsConfirmation: true },
//     // { action: 'reject', allowedRoles: ['director', 'ceo', 'Loan Admin'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
//   ],
//   approved: [
//     { action: 'disburse', allowedRoles: ['director', 'ceo'], targetStatus: 'disbursed', needsConfirmation: true },
//   ],
//   disbursed: [
//     { action: 'complete', allowedRoles: ['Loan Admin', 'director', 'ceo', 'system'], targetStatus: 'completed', needsConfirmation: false },
//     { action: 'default', allowedRoles: ['Loan Admin', 'director', 'ceo', 'system'], targetStatus: 'defaulted', needsConfirmation: true, requiresPayload: ['reason'] }
//   ],
//   rejected: [],
//   completed: [],
//   defaulted: []
// }
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

// ─────────────────────────────────────────────────────────────────────────────
//  ASSET LOAN TRANSITIONS
//  Full flow: initiated → collateral → inspection → request-approval → …
// ─────────────────────────────────────────────────────────────────────────────
export const TRANSITIONS = {
  initiated: [
    { action: 'request-collateral', allowedRoles: ['Loan Admin'], targetStatus: 'pending-collateral-addition', needsConfirmation: false }
  ],
  'pending-collateral-addition': [
    { action: 'client-added-collateral', allowedRoles: ['system'], targetStatus: 'pending-collateral-inspection', needsConfirmation: false }
  ],
  'pending-collateral-inspection': [
    { action: 'request-inspection', allowedRoles: ['Loan Admin'], targetStatus: 'collateral-inspection', needsConfirmation: false },
    { action: 'reject', allowedRoles: ['Loan Admin'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
  ],
  'collateral-inspection': [
    { action: 'inspect-and-submit', allowedRoles: ['Collateral Inspector'], targetStatus: 'request-approval', needsConfirmation: false, requiresPayload: ['inspectionReport'] },
    { action: 'request-approval', allowedRoles: ['Loan Admin'], targetStatus: 'request-approval', needsConfirmation: false },
  ],
  'request-approval': [
    { action: 'accept', allowedRoles: ['director', 'ceo'], targetStatus: 'accepted', needsConfirmation: true },
    { action: 'reject', allowedRoles: ['director', 'ceo'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
  ],
  accepted: [
    { action: 'client-signs', allowedRoles: ['system'], targetStatus: 'pending-approval', needsConfirmation: false }
  ],
  'pending-approval': [
    { action: 'add-appendix', allowedRoles: ['Loan Admin'], targetStatus: 'pending-approval', needsConfirmation: false, requiresPayload: ['appendix'] },
  ],
  approved: [
    { action: 'disburse', allowedRoles: ['director', 'ceo'], targetStatus: 'disbursed', needsConfirmation: true },
  ],
  disbursed: [
    { action: 'complete', allowedRoles: ['Loan Admin', 'director', 'ceo', 'system'], targetStatus: 'completed', needsConfirmation: false },
    { action: 'default', allowedRoles: ['Loan Admin', 'director', 'ceo', 'system'], targetStatus: 'defaulted', needsConfirmation: true, requiresPayload: ['reason'] }
  ],
  rejected: [],
  completed: [],
  defaulted: []
}

// ─────────────────────────────────────────────────────────────────────────────
//  SALARY LOAN TRANSITIONS
//  Shorter flow: initiated → request-approval → accepted → pending-approval
//               → approved → disbursed → completed/defaulted
//  No collateral, no inspection, no collateral inspector role anywhere.
// ─────────────────────────────────────────────────────────────────────────────
export const SALARY_TRANSITIONS = {
  initiated: [
    // Loan admin goes straight to requesting approval — no collateral step
    { action: 'request-approval', allowedRoles: ['Loan Admin'], targetStatus: 'request-approval', needsConfirmation: false }
  ],
  'request-approval': [
    { action: 'accept', allowedRoles: ['director', 'ceo'], targetStatus: 'accepted', needsConfirmation: true },
    { action: 'reject', allowedRoles: ['director', 'ceo'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
  ],
  accepted: [
    // System moves the loan forward once the client signs their forms
    { action: 'client-signs', allowedRoles: ['system'], targetStatus: 'pending-approval', needsConfirmation: false }
  ],
  'pending-approval': [
    { action: 'add-appendix', allowedRoles: ['Loan Admin'], targetStatus: 'pending-approval', needsConfirmation: false, requiresPayload: ['appendix'] },
  ],
  approved: [
    { action: 'disburse', allowedRoles: ['director', 'ceo'], targetStatus: 'disbursed', needsConfirmation: true },
  ],
  disbursed: [
    { action: 'complete', allowedRoles: ['Loan Admin', 'director', 'ceo', 'system'], targetStatus: 'completed', needsConfirmation: false },
    { action: 'default', allowedRoles: ['Loan Admin', 'director', 'ceo', 'system'], targetStatus: 'defaulted', needsConfirmation: true, requiresPayload: ['reason'] }
  ],
  // Statuses that exist in the shared DB schema but are unreachable for salary loans
  'pending-collateral-addition': [],
  'pending-collateral-inspection': [],
  'collateral-inspection': [],
  rejected: [],
  completed: [],
  defaulted: []
}

// ─────────────────────────────────────────────────────────────────────────────
//  Helper — pick the right transition map for a given loan object.
//  Accepts both Strapi v4 populate shapes:
//    flat:   loan.loanType.typeName
//    nested: loan.loanType.data.attributes.typeName
// ─────────────────────────────────────────────────────────────────────────────
export function getTransitions(loan) {
  const typeName =
    loan?.loanType?.typeName ||
    loan?.loanType?.data?.attributes?.typeName ||
    ''
  return typeName === 'salaryBased' ? SALARY_TRANSITIONS : TRANSITIONS
}