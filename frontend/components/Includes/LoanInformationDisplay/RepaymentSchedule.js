// import React from 'react'
// import {
//   Box,
//   Typography,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Button,
//   useMediaQuery
// } from '@mui/material'
// import { styled, useTheme } from '@mui/material/styles'

// const NextDueRow = styled(TableRow)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.light
// }))

// const JustOverdueRow = styled(TableRow)(({ theme }) => ({
//   backgroundColor: theme.palette.warning.light
// }))

// const FarOverdueRow = styled(TableRow)(({ theme }) => ({
//   backgroundColor: theme.palette.error.light
// }))

// const RepaymentSchedule = ({ schedule, onMakePayment }) => {
//   const now = new Date()
//   const theme = useTheme()
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

//   if (!schedule || schedule.length === 0) {
//     return (
//       <Box p={2} textAlign="center">
//         <Typography variant="h6">
//           No repayment schedule available
//         </Typography>
//       </Box>
//     )
//   }

//   // only pending, sorted
//   const pending = schedule
//     .filter(item => item.status === 'pending')
//     .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

//   // next upcoming (for highlight)
//   const next = pending.find(item => new Date(item.dueDate) > now)

//   // helper: full-month difference
//   const monthDiff = (d1, d2) =>
//     (d1.getFullYear() - d2.getFullYear()) * 12 +
//     (d1.getMonth() - d2.getMonth())

//   return (
//     <>
//       {isSmall && (
//         <Box
//           sx={{
//             mb: 1,
//             p: 1,
//             display: 'flex',
//             alignItems: 'center',
//             overflow: 'hidden'
//           }}
//         >
//           <Typography
//             variant="body2"
//             sx={{
//               whiteSpace: 'nowrap',
//               animation: 'swipeHint 2s ease-in-out infinite alternate'
//             }}
//           >
//             Swipe the table to the right → to see Action
//           </Typography>
//           <Box
//             component="style"
//             children={`
//               @keyframes swipeHint {
//                 from { transform: translateX(0); }
//                 to   { transform: translateX(20px); }
//               }
//             `}
//           />
//         </Box>
//       )}

//       <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Due Date</TableCell>
//               <TableCell>Principal</TableCell>
//               <TableCell>Interest</TableCell>
//               <TableCell>Total Due</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="right">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {pending.map(entry => {
//               const due = new Date(entry.dueDate)
//               let RowComponent = TableRow

//               // highlight next due
//               if (entry.id === next?.id) {
//                 RowComponent = NextDueRow
//               }
//               // far overdue (>1 month past)
//               else if (due < now && monthDiff(now, due) > 1) {
//                 RowComponent = FarOverdueRow
//               }
//               // just overdue (within last month)
//               else if (due < now) {
//                 RowComponent = JustOverdueRow
//               }

//               const isOverdue = due < now
//               const isThisMonth =
//                 due.getFullYear() === now.getFullYear() &&
//                 due.getMonth() === now.getMonth()

//               const showButton = isOverdue || isThisMonth

//               return (
//                 <RowComponent key={entry.id}>
//                   <TableCell>{entry.dueDateInWords}</TableCell>
//                   <TableCell>
//                     {entry.principalDue.toLocaleString()}
//                   </TableCell>
//                   <TableCell>
//                     {entry.interestDue.toLocaleString()}
//                   </TableCell>
//                   <TableCell>
//                     {(entry.principalDue + entry.interestDue).toLocaleString()}
//                   </TableCell>
//                   <TableCell>{entry.status}</TableCell>
//                   <TableCell align="right">
//                     {showButton && (
//                       <Button
//                         color='success'
//                         variant="contained"
//                         onClick={() => onMakePayment(entry.id)}
//                       >
//                         Make Payment
//                       </Button>
//                     )}
//                   </TableCell>
//                 </RowComponent>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   )
// }

// export default RepaymentSchedule

import React from 'react'
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  useMediaQuery
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// row styles
const PaidRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.success.light
}))
const NextDueRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light
}))
const JustOverdueRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light
}))
const FarOverdueRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.error.light
}))

const RepaymentSchedule = ({ schedule, onMakePayment }) => {
  const now = new Date()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  if (!schedule || schedule.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="h6">
          No repayment schedule available
        </Typography>
      </Box>
    )
  }

  // helper: full-month difference
  const monthDiff = (d1, d2) =>
    (d1.getFullYear() - d2.getFullYear()) * 12 +
    (d1.getMonth() - d2.getMonth())

  // sort by status (partial → pending → paid), then by date
  const statusOrder = { partial: 0, pending: 1, paid: 2 }
  const sorted = [...schedule].sort((a, b) => {
    const sa = statusOrder[a.status]
    const sb = statusOrder[b.status]
    if (sa !== sb) return sa - sb
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  // find next upcoming pending for highlight
  const next = sorted.find(
    item => item.status === 'pending' && new Date(item.dueDate) > now
  )

  // currency formatter for "K"
  const formatK = num =>
    'K' +
    num
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, m => m + ',')

  return (
    <>
      {isSmall && (
        <Box
          sx={{
            mb: 1,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              animation: 'swipeHint 2s ease-in-out infinite alternate'
            }}
          >
            Swipe → to see Action
          </Typography>
          <Box
            component="style"
            children={`
              @keyframes swipeHint {
                from { transform: translateX(0); }
                to   { transform: translateX(20px); }
              }
            `}
          />
        </Box>
      )}

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Due Date</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Total Due</TableCell>
              <TableCell>Late Fee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map(entry => {
              const due = new Date(entry.dueDate)
              const isOverdue = due < now
              const isThisMonth =
                due.getFullYear() === now.getFullYear() &&
                due.getMonth() === now.getMonth()

              // pick row component
              let RowComponent = TableRow
              if (entry.status === 'paid') {
                RowComponent = PaidRow
              } else if (entry.id === next?.id) {
                RowComponent = NextDueRow
              } else if (isOverdue && monthDiff(now, due) > 1) {
                RowComponent = FarOverdueRow
              } else if (isOverdue) {
                RowComponent = JustOverdueRow
              }

              // show button only for overdue or this month
              const showButton = isOverdue || isThisMonth

              const total = entry.principalDue + entry.interestDue

              return (
                <RowComponent key={entry.id}>
                  <TableCell>{entry.dueDateInWords}</TableCell>
                  <TableCell>{formatK(entry.principalDue)}</TableCell>
                  <TableCell>{formatK(entry.interestDue)}</TableCell>
                  <TableCell>{formatK(total)}</TableCell>
                  <TableCell>{formatK(entry.lateFee || 0)}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell align="right">
                    {showButton && (
                      <Button
                        variant="contained"
                        onClick={() => onMakePayment(entry.id)}
                      >
                        Make Payment
                      </Button>
                    )}
                  </TableCell>
                </RowComponent>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RepaymentSchedule
