'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CollateralCarousel from './CollateralCarousel'
import { Alert } from '@mui/material'
import { Slide } from '@material-ui/core'

export default class LoanDetails extends React.Component {
  getStatusColor = status => {
    switch (status) {
      case 'initiated':
      case 'pending-collateral-addition':
      case 'pending-collateral-inspection':
        return 'warning'
      case 'accepted':
      case 'disbursed':
        return 'info'
      case 'approved':
        return 'success'
      case 'completed':
        return 'secondary'
      case 'defaulted':
        return 'error'
      default:
        return 'default'
    }
  }

  formatDate = d => {
    if (!d) return '-'
    try {
      return new Date(d).toLocaleString()
    } catch (e) {
      return d
    }
  }

  renderCollateralDetails = collateral => {
    if (!collateral) return <p>-</p>
    const t = collateral.collateralType
    if (t === 'vehicle') {
      const v = collateral.vehicle || {}
      return (
        <Box sx={{ mt: 1 }}>
          <h6 style={{marginBottom:'10px'}}>Vehicle Details</h6>
          <Divider sx={{ my: 1 }} />
          <p>Number plate: {v.numberPlate || '-'}</p>
          <p>Packed: {v.packed ? 'Yes' : 'No'}</p>
          <p>Packing fee paid: {v.packingFeePaid ? 'Yes' : 'No'}</p>
        </Box>
      )
    }
    if (t === 'land' || t === 'house') {
      const h = collateral[t] || {}
      return (
        <Box sx={{ mt: 1 }}>
          <p variant="subtitle2">{t === 'land' ? 'Land details' : 'House details'}</p>
          <p>Location: {h.location || '-'}</p>
          <p>Plot number: {h.plotNumber || '-'}</p>
        </Box>
      )
    }
    return (
      <Box sx={{ mt: 1 }}>
        <p>Collateral Name: <strong>{collateral.otherCollateralName || '-'}</strong></p>
      </Box>
    )
  }

  render() {
    const { loan, role } = this.props
    if (!loan) return <p>Loading loan...</p>

    const collateralMedia = loan.collateral?.CollateralMedia?.data || []
    const collateral = loan.collateral || {}
    if(loan && loan.loanType && loan.loanType.data && loan.loanType.data.attributes && loan.loanType.data.attributes.typeName === "salaryBased" && role === "Collateral Inspector"){
      return <Alert severity='info'>This loan does not have collateral, because it is salary based</Alert>
    }
    return (
        <Slide in={true} direction="right">
        <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 1.5, sm: 2, textTransform:'capitalize' } }}>
            <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Box>
                    {/* <p variant="h4">K{loan.loanAmount}</p> */}
                    <p>Requested Amount</p>
                    <p variant="body2"> <strong>K{loan.clientAskingAmount || loan.loanAmount}</strong></p>
                    </Box>
                    <strong><Chip label={loan.loanStatus === "accepted"? "Approved" : loan.loanStatus} color={this.getStatusColor(loan.loanStatus)} /></strong>
                </Box>
                </Grid>

                {loan && loan.loanType && loan.loanType.data && loan.loanType.data.attributes && loan.loanType.data.attributes.typeName === "salaryBased"? null : <Grid item xs={12}>
                <Divider sx={{ mb: 1}} />
                <h4 style={{marginBottom:'10px'}}>Collateral Images</h4>
                <CollateralCarousel media={collateralMedia} />
                </Grid>}

                {loan && loan.loanType && loan.loanType.data && loan.loanType.data.attributes && loan.loanType.data.attributes.typeName === "salaryBased"? null : <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <h4 style={{marginBottom:'10px'}}>Collateral</h4>
                <p>Type: <strong>{collateral.collateralType || '-'}</strong></p>
                {this.renderCollateralDetails(collateral)}
                {loan.collateral && loan.collateral.collateralStatus === "inspected"? <Box sx={{ mt: 1 }}>
                <Divider sx={{ my: 2 }} />
                <h4 style={{marginBottom:'10px'}}>Inspector's Report</h4>
                <p>Collateral Value: {collateral.inspectedValue}</p>
                <p>Collateral Condition: {collateral.inspectedCondition}</p>
                <p>Collateral Condition: {collateral.inspectedCondition}</p>
                {loan.inspectorRecommendationOnLoan? <p>Inspector Recommendation On Loan: <strong>{loan.inspectorRecommendationOnLoan}</strong></p> : null}
                {loan.inspectorReasonForLoanDisproval? <p>Inspector Reason For Loan Disproval: <strong>{loan.inspectorReasonForLoanDisproval}</strong></p> : null}
                {loan.inspectorRecommendedAmount? <p>Inspector Recommended Amount: <strong>{loan.inspectorRecommendedAmount}</strong></p> : null}
                {collateral.inspectionNotes? <p>Inspector's Notes on Collateral: {collateral.inspectionNotes}</p> : null}
                {collateral.inspectionDate && role !== "Collateral Inspector"? <p>Collateral Inspection Date: {this.formatDate(collateral.inspectionDate)} </p> : null}
                
                </Box> : <Alert severity='info'>Inspector's report will appear here when collateral has been inspected</Alert>}
                </Grid>}
                
                {role === "Collateral Inspector"? null : <Grid item xs={12}>
                <Divider sx={{ mb: 1 }} />
                <h4 style={{marginBottom:'10px'}}>Loan details</h4>
                <Box>
                    <p>Interest rate: {loan.interestRate}%</p>
                    <p>Term: {loan.loanTerm} months</p>
                    <p>Purpose: {loan.loanPurpose || '-'}</p>
                    <p>Purpose details: {loan.loanPurposeDetails || '-'}</p>
                    <p>Applied: {this.formatDate(loan.applicationDate)}</p>
                    <p>Approved: {this.formatDate(loan.approvalDate)}</p>
                    <p>Disbursed: {this.formatDate(loan.disbursementDate)}</p>
                    <p>Outstanding: K{loan.outstandingAmount}</p>
                    <p>Repayment total: K{loan.repaymentAmount}</p>
                    <p>Disbursed amount: K{loan.disbursedAmount}</p>
                    <p>Payment schedule created: {loan.paymentScheduleCreated ? 'Yes' : 'No'}</p>
                    <p>Acceptance date: {this.formatDate(loan.acceptanceDate)}</p>
                </Box>
                </Grid>}

            </Grid>
            </Paper>
        </Box>
        </Slide>
    )
  }
}