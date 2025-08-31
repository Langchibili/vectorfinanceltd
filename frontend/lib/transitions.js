export const STATUSES = [
  'initiated',
  'pending-collateral-addition',
  'pending-collateral-inspection',
  'collateral-inspection',
  'request-approval',
  'accepted',
  'pending-approval',
  'approved',
  'rejected',
  'disbursed',
  'completed',
  'defaulted'
]

/*
  TRANSITIONS maps currentStatus => [
    {
      action: 'action-key',
      allowedRoles: [ 'director' | 'ceo' | 'Loan Admin' | 'Collateral Inspector' | 'system' ],
      targetStatus: 'new-status',
      needsConfirmation: true|false,      // optional: UI may prompt for reason/confirm
      requiresPayload: ['reason','attachments'] // optional required payload keys for server
    }
  ]
*/
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
    { action: 'inspect-and-submit', allowedRoles: ['Collateral Inspector'], targetStatus: 'request-approval', needsConfirmation: false, requiresPayload: ['inspectionReport'] }
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
    // { action: 'approve', allowedRoles: ['director', 'ceo'], targetStatus: 'approved', needsConfirmation: true },
    // { action: 'reject', allowedRoles: ['director', 'ceo', 'Loan Admin'], targetStatus: 'rejected', needsConfirmation: true, requiresPayload: ['reason'] }
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