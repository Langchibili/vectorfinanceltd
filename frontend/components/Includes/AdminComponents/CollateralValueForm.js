'use client'
import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { getLoanFromId, updateLoan } from '@/Functions'
import CollateralMedia from '../CollateralMedia/CollateralMedia'
import { api_url, getJwt } from '@/Constants'

export default class AddColateralInformation extends React.Component {
  state = {
    open: false,
    giveLoan: null,           // true | false | null
    useLoanAmount: false,     // whether they chose the shown loanAmount chip
    recommendedAmount: '',    // number (string in input)
    reasonSelect: '',         // selected reason key
    reasonText: '',           // if 'other'
    notes: '',
    loading: false,
    error: '',
    collateralMedia: null,
    collateralSlots: [ 'front', 'back', 'right', 'left' ]
  }

  DRAFT_KEY = loanId => `addCollateralDraft_${loanId}`

  predefinedReasons = [
    { value: 'insufficient_collateral', label: 'Insufficient collateral' },
    { value: 'fraud_concern', label: 'Fraud / suspect documents' },
    { value: 'poor_credit', label: 'Poor credit history' },
    { value: 'incomplete_docs', label: 'Incomplete documentation' },
    { value: 'other', label: 'Other (specify)' }
  ]

  async componentDidMount() {
    const { collateral } = await getLoanFromId(this.props.loan.id, "collateral.CollateralMedia");
    if(!collateral){
        return null
    }
    if(collateral.collateralType === "vehicle"){
        this.setState({
            collateralSlots: [ 'front', 'back', 'right', 'left' ],
            collateralMedia: {
                front: collateral?.CollateralMedia?.data?.[0] ?? null,
                back: collateral?.CollateralMedia?.data?.[1] ?? null,
                right: collateral?.CollateralMedia?.data?.[2] ?? null,
                left: collateral?.CollateralMedia?.data?.[3] ?? null
            }
        })
    }
    if(collateral.collateralType === "house"){
        this.setState({
            collateralSlots: [ 'front', 'back'],
            collateralMedia: {
                front: collateral?.CollateralMedia?.data?.[0] ?? null,
                back: collateral?.CollateralMedia?.data?.[1] ?? null
            }
        })
    }
    if(collateral.collateralType === "land"){
        this.setState({
            collateralSlots: ['landscape image'],
            collateralMedia: {
               'landscape image': collateral?.CollateralMedia?.data?.[0] ?? null
            }
        })
    }
    if(collateral.collateralType === "other"){
        this.setState({
            collateralSlots: ['image'],
            collateralMedia: {
                'image': collateral?.CollateralMedia?.data?.[0] ?? null
            }
        })
    }
    
    
  }

  open = () => {
    this.setState({ open: true, error: '' }, () => {
      this.loadDraft()
    })
  }

  close = () => {
    this.setState({
      open: false,
      giveLoan: null,
      useLoanAmount: false,
      recommendedAmount: '',
      reasonSelect: '',
      reasonText: '',
      notes: '',
      loading: false,
      error: ''
    })
  }

  loadDraft = () => {
    const { loan } = this.props
    if (!loan || typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(this.DRAFT_KEY(loan.id))
      if (!raw) return
      const obj = JSON.parse(raw)
      this.setState({
        giveLoan: obj.giveLoan ?? null,
        useLoanAmount: obj.useLoanAmount ?? false,
        recommendedAmount: obj.recommendedAmount ?? '',
        reasonSelect: obj.reasonSelect ?? '',
        reasonText: obj.reasonText ?? '',
        notes: obj.notes ?? '',
        inspectedCondition: obj.inspectedCondition ?? '',
        inspectedValue: obj.inspectedValue ?? ''
      })
    } catch (err) {
      // ignore parse errors
      console.warn('failed to load addCollateral draft', err)
    }
  }

  saveDraft = () => {
    const { loan } = this.props
    if (!loan || typeof window === 'undefined') return
    const obj = {
      giveLoan: this.state.giveLoan,
      useLoanAmount: this.state.useLoanAmount,
      recommendedAmount: this.state.recommendedAmount,
      reasonSelect: this.state.reasonSelect,
      reasonText: this.state.reasonText,
      notes: this.state.notes,
      inspectedCondition: this.state.inspectedCondition,
      inspectedValue: this.state.inspectedValue
    }
    try {
      localStorage.setItem(this.DRAFT_KEY(loan.id), JSON.stringify(obj))
    } catch (err) {
      console.warn('failed to save draft', err)
    }
  }

  // called on every change to persist immediately
  setField = (field, value) => {
    this.setState({ [field]: value }, () => {
      this.saveDraft()
    })
  }

  pickLoanAmountChip = () => {
    const { loan } = this.props
    if (!loan) return
    this.setState({ useLoanAmount: true, recommendedAmount: String(loan.loanAmount) }, () => {
      this.saveDraft()
    })
  }

  onRecommendedChange = e => {
    this.setState({ recommendedAmount: e.target.value, useLoanAmount: false }, () => {
      this.saveDraft()
    })
  }

  onGiveLoanChange = (e) => {
    const val = e.target.value === 'yes'
    this.setState({ giveLoan: val, error: '' }, () => {
      this.saveDraft()
    })
  }

  onReasonSelect = (e) => {
    this.setState({ reasonSelect: e.target.value, reasonText: '' }, () => {
      this.saveDraft()
    })
  }

  onReasonTextChange = (e) => {
    this.setState({ reasonText: e.target.value }, () => {
      this.saveDraft()
    })
  }

  onNotesChange = (e) => {
    this.setState({ notes: e.target.value }, () => {
      this.saveDraft()
    })
  }

  onInspectedConditionChange = e => {
    this.setState({ inspectedCondition: e.target.value }, () => {
      this.saveDraft()
    })
  }

  onInspectedValueChange = e => {
    // keep numeric string
    this.setState({ inspectedValue: e.target.value }, () => {
      this.saveDraft()
    })
  }


  // validation rules
  isValid = () => {
    const { giveLoan, recommendedAmount, reasonSelect, reasonText, collateralMedia, collateralSlots } = this.state
    const collateralMediaSet = Array.isArray(collateralSlots) && collateralSlots.length > 0 && collateralSlots.every(slot => !!collateralMedia && !!collateralMedia[slot])

    if (giveLoan === null) return false
    if (!this.state.inspectedCondition || String(this.state.inspectedCondition).trim() === '') return false
    const inspectedNum = Number(this.state.inspectedValue)
    if (isNaN(inspectedNum) || inspectedNum <= 0) return false
    if (giveLoan === true) {
      if (!recommendedAmount) return false
      const num = Number(recommendedAmount)
      if (isNaN(num) || num <= 0) return false
      if(!collateralMediaSet) return false
      return true
    } else {
      // giveLoan === false
      if (!reasonSelect) return false
      if (reasonSelect === 'other' && (!reasonText || String(reasonText).trim() === '')) return false
      if(!collateralMediaSet) return false
      return true
    }
  }

  clearDraft = () => {
    const { loan } = this.props
    if (!loan || typeof window === 'undefined') return
    localStorage.removeItem(this.DRAFT_KEY(loan.id))
    this.setState({
      giveLoan: null,
      useLoanAmount: false,
      recommendedAmount: '',
      reasonSelect: '',
      reasonText: '',
      notes: '',
      error: ''
    })
  }

  submit = async () => {
    const { loan, onUpdated } = this.props
    if (!loan) return
    if (!this.isValid()) {
      this.setState({ error: 'Please complete required fields' })
      return
    }

    this.setState({ loading: true, error: '' })
    try {
      const { giveLoan, recommendedAmount, inspectedCondition, inspectedValue, useLoanAmount, reasonSelect, reasonText, notes } = this.state
  
      const updateData = {
        data:{
            inspectorRecommendationOnLoan: giveLoan? "Give Loan": "Do Not Give Loan",
            inspectorRecommendedAmount: giveLoan ? Number(recommendedAmount) : null,
            inspectorReasonForLoanDisproval: giveLoan ? null : (reasonSelect === 'other' ? (reasonText || '') : ''),
            collateral:{
                id: loan.collateral.id,
                collateralStatus: "inspected",
                inspectionDate: new Date(),
                inspectionNotes: notes || '',
                inspectedCondition: inspectedCondition || null,
                inspectedValue: inspectedValue ? Number(this.state.inspectedValue) : null
            }
        }
      }

    //   const body = {
    //     data: {
    //       status: 'request-approval', // move workflow forward
    //       lastAction: 'inspect-and-submit',
    //       lastActionByRole: this.props.role,
    //       lastActionAt: new Date().toISOString(),
    //       actionPayload
    //     }
    //   }

      const updated = await updateLoan(updateData, loan.id)

      // clear local draft on success
      try {
        localStorage.removeItem(this.DRAFT_KEY(loan.id))
      } catch (e) {}

      if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)

      this.setState({
        loading: false,
        open: false,
        giveLoan: null,
        useLoanAmount: false,
        recommendedAmount: '',
        reasonSelect: '',
        reasonText: '',
        notes: '',
        error: ''
      })
    } catch (err) {
      console.error('AddColateralInformation submit error', err)
      this.setState({ loading: false, error: 'Failed to submit. Try again.' })
    }
  }

  handleAddCollateralMedia = (side, files) => {
      this.setState(prev => ({
        collateralMedia: {
          ...prev.collateralMedia,
          [side]: prev.collateralMedia[side] ? [...prev.collateralMedia[side], ...files] : files
        },
        saved: false,
        error: null
      }));
    }

    handleRemoveCollateralMedia = async (side, uploadId) => {
     const removed = await fetch(api_url+'/upload/files/'+uploadId,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
      
    if(removed){
      this.setState(prev => ({
       collateralMedia: {
        ...prev.collateralMedia,
        [side]: null
      }
    }))
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, giveLoan, recommendedAmount, useLoanAmount, collateralMedia, collateralSlots, reasonSelect, reasonText, notes, loading, error } = this.state

    // guards: only collateral inspector and correct status
    if (!loan) return null
    if (String(role).toLowerCase() !== 'collateral inspector'.toLowerCase()) return null
    if (String(loan.loanStatus).toLowerCase() !== 'collateral-inspection') return null

    const loanAmountDisplay = loan.loanAmount || loan.clientAskingAmount || ''
    if(loan.collateral && loan.collateral.collateralStatus === "inspected"){
       return <Alert severity='success'>Thank you for submitting the inspection on this collateral.</Alert>
    }
    return (
      <>
        <Button variant="outlined" size="small" onClick={this.open}>
          Add Collateral Information
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>Add Collateral Information</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Provide your inspection decision and recommended amount (if any). Draft is autosaved locally.
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Should we give this client a loan?</Typography>
              <RadioGroup row value={giveLoan === null ? '' : (giveLoan ? 'yes' : 'no')} onChange={this.onGiveLoanChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Collateral condition</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                    label="New"
                    clickable
                    color={this.state.inspectedCondition === 'new' ? 'primary' : 'default'}
                    onClick={() => this.onInspectedConditionChange({ target: { value: 'new' } })}
                />
                <Chip
                    label="Good"
                    clickable
                    color={this.state.inspectedCondition === 'good' ? 'primary' : 'default'}
                    onClick={() => this.onInspectedConditionChange({ target: { value: 'good' } })}
                />
                <Chip
                    label="Bad"
                    clickable
                    color={this.state.inspectedCondition === 'bad' ? 'primary' : 'default'}
                    onClick={() => this.onInspectedConditionChange({ target: { value: 'bad' } })}
                />
                </Stack>

                <Typography variant="subtitle2" sx={{ mt: 2 }}>Collateral value (your valuation)</Typography>
                <TextField
                label="Inspected value"
                value={this.state.inspectedValue}
                onChange={this.onInspectedValueChange}
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                sx={{ mt: 1 }}
                />
            </Box>
            {giveLoan === true && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">How much do you recommend we give the client?</Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={`Use their asking amount: K${loanAmountDisplay}`}
                    clickable
                    color={useLoanAmount ? 'primary' : 'default'}
                    onClick={this.pickLoanAmountChip}
                  />
                  <Typography variant="body2" color="text.secondary">or enter your recommended amount</Typography>
                </Stack>

                <TextField
                  label="Your recommended amount"
                  value={recommendedAmount}
                  onChange={this.onRecommendedChange}
                  fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  sx={{ mb: 1 }}
                />
              </Box>
            )}

            {giveLoan === false && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Reason for declining</Typography>

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel id="reason-select-label">Select reason</InputLabel>
                  <Select
                    labelId="reason-select-label"
                    value={reasonSelect}
                    label="Select reason"
                    onChange={this.onReasonSelect}
                    size="small"
                  >
                    {this.predefinedReasons.map(r => (
                      <MenuItem value={r.value} key={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {reasonSelect === 'other' && (
                  <TextField
                    label="Specify reason"
                    value={reasonText}
                    onChange={this.onReasonTextChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            )}
             {loan.collateral?
              <>
              <h5>Photos of collateral</h5>
              <CollateralMedia
                mediaSlots={collateralSlots}
                media={collateralMedia}
                onAdd={this.handleAddCollateralMedia}
                onRemove={this.handleRemoveCollateralMedia}
                refId={loan.collateral.id}
                />
              </>
                : null}
            <TextField
              label="Inspector notes (optional)"
              value={notes}
              name="notes"
              onChange={this.onNotesChange}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 1 }}
            />

            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.clearDraft} disabled={loading}>Clear draft</Button>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button onClick={this.submit} disabled={loading || !this.isValid()} variant="contained">
              {loading ? <CircularProgress size={18} /> : 'Submit Inspection'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
