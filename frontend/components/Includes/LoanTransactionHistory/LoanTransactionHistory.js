// "use client";

// import { Slide } from "@material-ui/core";
// import { Alert } from "@mui/material";
// import React from "react";

// export default class LoanTransactionHistory extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     }
//   }

//   renderTransactionHistoriesPagination = ()=>{
//     return <></>
//     return (
//       <>
//        <div className="align-items-center mt-2 row text-center text-sm-start">
//                   <div className="col-sm">
//                     <div className="text-muted">
//                       Showing<span className="fw-semibold">4</span> of{" "}
//                       <span className="fw-semibold">125</span> Results
//                     </div>
//                   </div>
//                   <div className="col-sm-auto">
//                     <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
//                       <li className="page-item disabled">
//                         <a href="#" className="page-link">
//                           ←
//                         </a>
//                       </li>
//                       <li className="page-item">
//                         <a href="#" className="page-link">
//                           1
//                         </a>
//                       </li>
//                       <li className="page-item active">
//                         <a href="#" className="page-link">
//                           2
//                         </a>
//                       </li>
//                       <li className="page-item">
//                         <a href="#" className="page-link">
//                           3
//                         </a>
//                       </li>
//                       <li className="page-item">
//                         <a href="#" className="page-link">
//                           →
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//       </>
//     )
//   }

//   displayDateOrTime = (transactionCreatedAt) => {
//     const TransactionCreatedAt = new Date(transactionCreatedAt);
//     const now = new Date();
//     const timeDifference = Math.abs(now - TransactionCreatedAt); // Difference in milliseconds

//     const seconds = Math.floor(timeDifference / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const weeks = Math.floor(days / 7);
//     const years = Math.floor(days / 365);

//     if (seconds < 60) {
//       return <span>Just now</span>;
//     } else if (minutes < 60) {
//       return <span>{minutes} minute{minutes > 1 ? "s" : ""} ago</span>;
//     } else if (hours < 24) {
//       return <span>{hours} hour{hours > 1 ? "s" : ""} ago</span>;
//     } else if (days < 7) {
//       return <span>{days} day{days > 1 ? "s" : ""} ago</span>;
//     } else if (weeks < 52) {
//       return <span>{weeks} week{weeks > 1 ? "s" : ""} ago</span>;
//     } else {
//       return <span>{years} year{years > 1 ? "s" : ""} ago</span>;
//     }
//  }

//  formatDateTime(isoString) {
//   // Create a Date object from the ISO string
//   const date = new Date(isoString);

//   // Extract and format the date and time components
//   const options = { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric', 
//     hour: '2-digit', 
//     minute: '2-digit', 
//     second: '2-digit' 
//   };
//   return date.toLocaleString(undefined, options);
// }


//   renderTransactionHistories = ()=>{
//     const transactionHistories = this.props.loggedInUser.transactionHistories
//     transactionHistories.reverse()
//     if(!transactionHistories || transactionHistories.length < 1){
//        return <Alert severity="info" sx={{marginTop:'10px'}}>You have no history at the moment</Alert>
//     }
//     else{
//       return transactionHistories.map((transactionHistory)=>{
//            return (
//             <>
//                <li className="list-group-item ps-0">
//                     <div className="row align-items-center g-3">
//                       <div className="col">
//                         <h5 className="text-muted mt-0 mb-2 fs-13">{this.displayDateOrTime(transactionHistory.transactionDate)}</h5>
//                         <a href="#" className="text-reset fs-14 mb-2">
//                           {transactionHistory.description}
//                         </a>
//                         <h5 className="text-muted mt-0 mb-2 fs-13">{this.formatDateTime(transactionHistory.transactionDate)}</h5>
//                       </div>
//                     </div>
//                     {/* end row */}
//                 </li>
//             </>
//            )
//       })
//     }
//   }

//   render() {
//     return <Slide in={true} direction="left">
//             <div className="col-xxl-5" style={{margin:'0 auto'}}>
//             <div className="card card-height-100">
//               <div className="card-header align-items-center d-flex">
//                 <h4 className="card-title mb-0 flex-grow-1">History</h4>
//                 <div className="flex-shrink-0">

//                 </div>
//               </div>
//               {/* end card header */}
//               <div className="card-body pt-0">
//                   <ul className="list-group list-group-flush border-dashed">
//                      {this.renderTransactionHistories()}
//                      {!this.props.loggedInUser.transactionHistories || this.props.loggedInUser.transactionHistories.length < 10? <></> : this.renderTransactionHistoriesPagination()}
//                   </ul>

//               </div>
//               {/* end card body */}
//             </div>
//             {/* end card */}
//           </div>
//     </Slide>;
//   }
// }
// //  id
// //  sign a letter of sale
"use client";

import { Slide } from "@material-ui/core";
import { Avatar, Chip } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  Receipt,
} from "@mui/icons-material";
import React from "react";
import { useThemeMode } from "@/components/ThemeProvider";

/* ─── colour tokens (mirrors ThemeProvider.jsx) ─────────────── */
const G = {
  green1: '#059669',
  green2: '#10B981',
  gold: '#C9A84C',
  red: '#F87171',
  blue: '#60A5FA',
};

/* ─── helpers ────────────────────────────────────────────────── */
function getTransactionTone(transactionHistory) {
  // Best-effort guess at debit/credit framing from common field shapes.
  // Falls back to a neutral blue/receipt styling if nothing matches —
  // safe to adjust once real field names are confirmed.
  const type = (transactionHistory.type || transactionHistory.transactionType || '').toLowerCase()
  const status = (transactionHistory.status || '').toLowerCase()

  if (status === 'failed' || status === 'declined') {
    return { color: G.red, Icon: ArrowDownward, label: status }
  }
  if (['credit', 'disbursement', 'deposit', 'repayment_received'].includes(type)) {
    return { color: G.green2, Icon: ArrowUpward, label: status || type }
  }
  if (['debit', 'repayment', 'withdrawal', 'fee'].includes(type)) {
    return { color: G.gold, Icon: ArrowDownward, label: status || type }
  }
  return { color: G.blue, Icon: Receipt, label: status || type }
}

function formatAmount(amount) {
  if (amount === undefined || amount === null || amount === '') return null
  const num = Number(amount)
  if (Number.isNaN(num)) return String(amount)
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

class LoanTransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderTransactionHistoriesPagination = () => {
    return <></>
    return (
      <>
        <div className="align-items-center mt-2 row text-center text-sm-start">
          <div className="col-sm">
            <div className="text-muted">
              Showing<span className="fw-semibold">4</span> of{" "}
              <span className="fw-semibold">125</span> Results
            </div>
          </div>
          <div className="col-sm-auto">
            <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
              <li className="page-item disabled">
                <a href="#" className="page-link">
                  ←
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a href="#" className="page-link">
                  2
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  3
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  displayDateOrTime = (transactionCreatedAt) => {
    const TransactionCreatedAt = new Date(transactionCreatedAt);
    const now = new Date();
    const timeDifference = Math.abs(now - TransactionCreatedAt); // Difference in milliseconds

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return <span>Just now</span>;
    } else if (minutes < 60) {
      return <span>{minutes} minute{minutes > 1 ? "s" : ""} ago</span>;
    } else if (hours < 24) {
      return <span>{hours} hour{hours > 1 ? "s" : ""} ago</span>;
    } else if (days < 7) {
      return <span>{days} day{days > 1 ? "s" : ""} ago</span>;
    } else if (weeks < 52) {
      return <span>{weeks} week{weeks > 1 ? "s" : ""} ago</span>;
    } else {
      return <span>{years} year{years > 1 ? "s" : ""} ago</span>;
    }
  }

  formatDateTime(isoString) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Extract and format the date and time components
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleString(undefined, options);
  }


  renderTransactionHistories = () => {
    const transactionHistories = this.props.loggedInUser.transactionHistories
    transactionHistories.reverse()
    const isDark = this.props.isDark
    if (!transactionHistories || transactionHistories.length < 1) {
      return (
        <li className="list-group-item ps-0" style={{ border: 'none' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '32px 16px',
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: isDark
                  ? 'linear-gradient(135deg,rgba(96,165,250,0.22),rgba(96,165,250,0.06))'
                  : 'linear-gradient(135deg,rgba(96,165,250,0.16),rgba(96,165,250,0.05))',
                border: `1.5px solid ${isDark ? 'rgba(96,165,250,0.28)' : 'rgba(96,165,250,0.22)'}`,
                color: G.blue,
              }}
            >
              <Receipt fontSize="small" />
            </Avatar>
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: isDark ? '#FFFFFF' : '#0D1F17',
              }}
            >
              No transactions yet
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.60)',
                maxWidth: 260,
              }}
            >
              Your loan activity will show up here once something happens on your account.
            </div>
          </div>
        </li>
      )
    }
    else {
      return transactionHistories.map((transactionHistory, idx) => {
        const { color, Icon, label } = getTransactionTone(transactionHistory)
        const amount = formatAmount(transactionHistory.amount)
        const isLast = idx === transactionHistories.length - 1
        return (
          <li
            key={transactionHistory.id || idx}
            className="list-group-item ps-0"
            style={{
              background: isDark ? '#0E1A14' : '#FFFFFF',
              backgroundColor: isDark ? '#0E1A14' : '#FFFFFF',
              border: 'none',
              borderBottom: isLast ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
              padding: '14px 4px',
              transition: 'background-color 0.18s',
              borderRadius: 10,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.025)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDark ? '#0E1A14' : '#FFFFFF' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${color}33, ${color}0D)`,
                  border: `1.5px solid ${color}3D`,
                  color,
                }}
              >
                <Icon fontSize="small" />
              </Avatar>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <a
                    href="#"
                    className="text"
                    style={{
                      color: isDark ? '#ffffffba' : '#0D1F17',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {transactionHistory.description}
                  </a>
                  {amount !== null && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                        fontWeight: 700,
                        fontSize: 13,
                        color,
                        flexShrink: 0,
                      }}
                    >
                      {amount}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  <span
                    title={this.formatDateTime(transactionHistory.transactionDate)}
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 12,
                      color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(13,31,23,0.50)',
                    }}
                  >
                    {this.displayDateOrTime(transactionHistory.transactionDate)}
                  </span>
                  {label && (
                    <Chip
                      label={label}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        background: `${color}1F`,
                        color,
                        '& .MuiChip-label': { px: '8px' },
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </li>
        )
      })
    }
  }

  render() {
    const isDark = this.props.isDark
    return <Slide in={true} direction="left">
      <div className="col-xxl-5" style={{ margin: '0 auto' }}>
        <div
          className="card card-height-100"
          style={{
            background: isDark
              ? 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)'
              : 'linear-gradient(160deg, #FFFFFF 0%, #FAFCFB 100%)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 16,
            backdropFilter: isDark ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: isDark ? 'blur(16px)' : 'none',
            boxShadow: isDark
              ? '0 16px 48px rgba(0,0,0,0.35)'
              : '0 4px 24px rgba(13,31,23,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            className="card-header align-items-center d-flex"
            style={{
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              padding: '16px 20px',
              background: isDark
                ? 'linear-gradient(90deg, rgba(16,185,129,0.06), transparent)'
                : 'linear-gradient(90deg, rgba(16,185,129,0.04), transparent)',
            }}
          >
            <h4
              className="card-title mb-0 flex-grow-1"
              style={{
                color: isDark ? '#FFFFFF' : '#0D1F17',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              History
            </h4>
            <div className="flex-shrink-0">

            </div>
          </div>
          {/* end card header */}
          <div className="card-body pt-0" style={{ padding: '8px 20px 16px 20px' }}>
            <ul
              className="list-group list-group-flush"
              style={{
                margin: 0,
                padding: 0,
                maxHeight: 420,
                overflowY: 'auto',
              }}
            >
              {this.renderTransactionHistories()}
              {!this.props.loggedInUser.transactionHistories || this.props.loggedInUser.transactionHistories.length < 10 ? <></> : this.renderTransactionHistoriesPagination()}
            </ul>

          </div>
          {/* end card body */}
        </div>
        {/* end card */}
      </div>
    </Slide>;
  }
}
//  id
//  sign a letter of sale

// Functional wrapper: supplies isDark from ThemeProvider's context so the
// class component above stays untouched logic-wise and only receives a prop.
export default function LoanTransactionHistoryWithTheme(props) {
  const { isDark } = useThemeMode();
  return <LoanTransactionHistory {...props} isDark={isDark} />;
}