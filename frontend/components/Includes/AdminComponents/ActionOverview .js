'use client'
import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import { TRANSITIONS } from '@/lib/transitions'
import { getPermissions } from '@/lib/permissions'
import { updateLoan } from '@/Functions'

// friendly labels
const ACTION_LABELS = {
  'request-collateral': 'Request collateral from client',
  'client-added-collateral': 'Client added collateral',
  'start-inspection': 'Start collateral inspection',
  'inspect-and-submit': 'Inspector submitted inspection',
  'accept': 'Accept loan (director/CEO)',
  'reject': 'Reject loan',
  'client-signs': 'Client signing loan form',
  'add-appendix': 'Add appendix / metadata (loan admin)',
  'approve': 'Approve loan',
  'disburse': 'Disburse funds',
  'complete': 'Mark as completed',
  'default': 'Mark as defaulted',
  'offer-new-amount': 'Offer new amount to client',
  'add-collateral-value': 'Add collateral value'
}

const STATUS_DESCRIPTIONS = {
  'initiated': 'Client created loan',
  'pending-collateral-addition': 'Awaiting collateral from client',
  'pending-collateral-inspection': 'Awaiting collateral inspection',
  'collateral-inspection': 'Inspector inspecting collateral',
  'request-approval': 'Awaiting loan approval',
  'accepted': 'Client signing loan form',
  'pending-approval': 'Awaiting final editions',
  'approved': 'Loan approved (pending disbursement)',
  'rejected': 'Loan rejected',
  'disbursed': 'Loan disbursed',
  'completed': 'Loan completed',
  'defaulted': 'Loan defaulted'
}

export default class ActionOverview extends React.Component {
  state = {
    loadingAction: null,
    error: ''
  }

  // label resolver
  getLabel = actionKey => ACTION_LABELS[actionKey] || actionKey

  // current activity text
  getCurrentActivity = loan => {
    if (!loan) return ''
    const lastAction = loan.lastAction || null
    if (lastAction && ACTION_LABELS[lastAction]) return ACTION_LABELS[lastAction]
    const s = loan.loanStatus || loan.status || ''
    return STATUS_DESCRIPTIONS[s] || `Status: ${s}`
  }

  // immediate actions for current status (exclude system)
  getImmediateActions = status => {
    if (!status) return []
    const list = TRANSITIONS[status] || []
    return list.filter(a => !(a.allowedRoles || []).includes('system'))
  }

  // upcoming actions one level deep: gather actions from each immediate action's targetStatus
  getUpcomingActions = status => {
    if (!status) return []
    const immediate = this.getImmediateActions(status)
    const upcoming = []
    immediate.forEach(im => {
      const nextList = TRANSITIONS[im.targetStatus] || []
      nextList.forEach(n => {
        if ((n.allowedRoles || []).includes('system')) return
        // avoid duplicates by action key
        if (!upcoming.find(x => x.action === n.action)) upcoming.push({ ...n, from: im.targetStatus })
      })
    })
    return upcoming
  }

  // check if role is allowed for action
  isAllowed = (actionObj, role) => {
    if (!actionObj || !actionObj.allowedRoles) return false
    const roleLower = String(role || '').toLowerCase()
    return actionObj.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)
  }

  // perform a simple action (no payload required)
  performAction = async actionObj => {
    const { loan, role, onUpdated, onOpenCollateralForm, onOpenOfferForm } = this.props
    if (!actionObj || !loan) return

    // If action expects payload and we have a dedicated form callback, open it instead
    if (actionObj.requiresPayload && Array.isArray(actionObj.requiresPayload) && actionObj.requiresPayload.length > 0) {
      // known payload actions: add-collateral-value, offer-new-amount
      if (actionObj.action === 'add-collateral-value' && typeof onOpenCollateralForm === 'function') {
        onOpenCollateralForm()
        return
      }
      if (actionObj.action === 'offer-new-amount' && typeof onOpenOfferForm === 'function') {
        onOpenOfferForm()
        return
      }
      // fallback: instruct user
      alert('This action requires additional information. Use the dedicated form.')
      return
    }

    // confirm
    const proceed = window.confirm(`Proceed with: "${this.getLabel(actionObj.action)}"?`)
    if (!proceed) return

    this.setState({ loadingAction: actionObj.action, error: '' })
    try {
      const body = {
        data: {
          status: actionObj.targetStatus,
          lastAction: actionObj.action,
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: {}
        }
      }
      const updated = await updateLoan(body, loan.id)
      if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
      this.setState({ loadingAction: null })
    } catch (err) {
      console.error('performAction error', err)
      this.setState({ loadingAction: null, error: 'Action failed' })
    }
  }


  getStatusTitle = status => {
    if(status === "request-approval"){
        return "awaiting approval"
    }
    if(status === "pending-approval"){
        return "pending final editions"
    }
    return status
  }

  render() {
    const { loan, role, ActionDisplay } = this.props
    const { loadingAction, error } = this.state
    if (!loan) return null

    const currentStatus = loan.loanStatus || loan.status || ''
    const immediate = this.getImmediateActions(currentStatus)
    const upcoming = this.getUpcomingActions(currentStatus)

    // upcoming actions relevant to this role (they will be shown greyed)
    const upcomingForRole = upcoming.filter(a => this.isAllowed(a, role))

    const currentActivity = this.getCurrentActivity(loan)

    return (
      <Paper sx={{ p: 2, maxWidth: 400, mx: 'auto', my: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Current activity</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentActivity}</Typography>
            <Chip label={this.getStatusTitle(currentStatus)} size="small" />
          </Box>
          {loan.lastActionAt && (
            <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
              Updated: {new Date(loan.lastActionAt).toLocaleString()}
            </Typography>
          )}
        </Box>

        <Divider />
{/* 
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Actions (this step)</Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {immediate.length === 0 && <Typography variant="body2">No actions available for this status</Typography>}

            {immediate.map(a => {
              const label = this.getLabel(a.action)
              const allowed = this.isAllowed(a, role)
              const disabled = !allowed
              const loading = loadingAction === a.action
              return (
                <Button
                  key={a.action}
                  variant={allowed ? 'contained' : 'outlined'}
                  size="small"
                  disabled={disabled || !!loading}
                  onClick={() => this.performAction(a)}
                  sx={{
                    textTransform: 'none',
                    opacity: disabled ? 0.45 : 1,
                    minWidth: 180,
                    justifyContent: 'flex-start'
                  }}
                >
                  {loading ? <CircularProgress size={16} sx={{ mr: 1 }} /> : null}
                  {label}
                </Button>
              )
            })}
          </Stack>

          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </Box> */}
        {ActionDisplay()}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Upcoming actions for you</Typography>

          {upcomingForRole.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No upcoming actions for your role at the moment
            </Typography>
          )}

          <Stack spacing={1}>
            {upcomingForRole.map(a => {
              const label = this.getLabel(a.action)
              // display as greyed disabled items because they're waiting on other steps
              return (
                <Button
                  key={'up_'+a.action}
                  variant="outlined"
                  size="small"
                  disabled
                  sx={{
                    textTransform: 'none',
                    opacity: 0.45,
                    justifyContent: 'flex-start',
                    minWidth: 220
                  }}
                >
                  {this.getStatusTitle(label)}
                  <Chip label={this.getStatusTitle(a.from || a.targetStatus)} size="small" sx={{ ml: 1 }} />
                </Button>
              )
            })}
          </Stack>
        </Box>
      </Paper>
    )
  }
}
