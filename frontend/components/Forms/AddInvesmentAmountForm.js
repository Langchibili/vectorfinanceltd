// "use client";

// import React, { useState } from "react";
// import { Alert, Slider, TextField, Button } from "@mui/material";

// const AddInvesmentAmountForm = ({ constants }) => {
//   const [investmentAmount, setInvestmentAmount] = useState(0);
//   const [investmentPeriod, setInvestmentPeriod] = useState(1); // Minimum period: 1 month
//   const [maxPeriod, setMaxPeriod] = useState(3); // Default max period: 3 months
//   const [totalReturn, setTotalReturn] = useState(0);

//   const { investmentInterestRate } = constants;

//   const handleAmountChange = (e) => {
//     const amount = parseFloat(e.target.value) || 0;
//     setInvestmentAmount(amount);

//     if (amount <= 50000) setMaxPeriod(3);
//     else if (amount <= 100000) setMaxPeriod(6);
//     else if (amount <= 150000) setMaxPeriod(9);
//     else setMaxPeriod(60); // Arbitrarily long for large amounts

//     // Reset the investment period if it exceeds the new max period
//     if (investmentPeriod > maxPeriod) setInvestmentPeriod(maxPeriod);

//     calculateTotalReturn(amount, investmentPeriod);
//   };

//   const handlePeriodChange = (e, newValue) => {
//     setInvestmentPeriod(newValue);
//     calculateTotalReturn(investmentAmount, newValue);
//   };

//   const calculateTotalReturn = (amount, period) => {
//     // Compound Interest Formula: A = P(1 + r/n)^(nt)
//     const ratePerPeriod = investmentInterestRate / 100;
//     const total = amount * Math.pow(1 + ratePerPeriod, period);
//     setTotalReturn(total.toFixed(2));
//   };

//   return (
//     <div>
//       <h3>Add Investment</h3>

//       {/* Investment Amount Input */}
//       <TextField
//         label="Investment Amount (Kwacha)"
//         type="number"
//         value={investmentAmount}
//         onChange={handleAmountChange}
//         fullWidth
//         margin="normal"
//       />

//       {/* Investment Period Slider */}
//       <div style={{ margin: "20px 0" }}>
//         <label>Investment Period (Months)</label>
//         <Slider
//           value={investmentPeriod}
//           onChange={handlePeriodChange}
//           step={1}
//           min={1}
//           max={maxPeriod}
//           valueLabelDisplay="auto"
//         />
//       </div>

//       {/* Total Return Display */}
//       {investmentAmount > 0 && (
//         <Alert severity="info">
//           If you invest <strong>{investmentAmount} Kwacha</strong> for <strong>{investmentPeriod} months</strong>, you will receive a total return of <strong>{totalReturn} Kwacha</strong>.
//         </Alert>
//       )}

//       {/* Submit Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => alert(`Investment Added: ${investmentAmount} Kwacha for ${investmentPeriod} months.`)}
//         disabled={investmentAmount <= 0}
//       >
//         Add Investment
//       </Button>
//     </div>
//   );
// };

// export default AddInvesmentAmountForm;


import React, { Component } from 'react'

class AddInvesmentAmountForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 5000,
            interestRate: 5,
            duration: 12,
            projectedReturns: 0
        }
    }

    componentDidMount() {
        this.calculateReturns()
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value }, this.calculateReturns)
    }

    calculateReturns = () => {
        const { amount, interestRate, duration } = this.state
        const principal = parseFloat(amount)
        const rate = parseFloat(interestRate) / 100
        const time = parseFloat(duration) / 12 // Convert months to years
        const returns = principal * Math.pow(1 + rate, time) - principal
        this.setState({ projectedReturns: returns.toFixed(2) })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        alert(`Investment successfully saved!\nAmount: ${this.state.amount}\nDuration: ${this.state.duration} months\nProjected Returns: ${this.state.projectedReturns}`)
    }

    render() {
        const { amount, interestRate, duration, projectedReturns } = this.state

        return (
            <form onSubmit={this.handleSubmit} className="investment-form">
                <div className="form-group">
                    <label htmlFor="amount">Investment Amount</label>
                    <input 
                        type="number" 
                        id="amount" 
                        name="amount" 
                        className="form-control" 
                        value={amount} 
                        onChange={this.handleChange} 
                        min="1000" 
                        max="1000000" 
                        step="100" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="interestRate">Interest Rate (%)</label>
                    <input 
                        type="number" 
                        id="interestRate" 
                        name="interestRate" 
                        className="form-control" 
                        value={interestRate} 
                        onChange={this.handleChange} 
                        min="1" 
                        max="20" 
                        step="0.1" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Duration (months)</label>
                    <input 
                        type="range" 
                        id="duration" 
                        name="duration" 
                        className="form-range" 
                        value={duration} 
                        onChange={this.handleChange} 
                        min="1" 
                        max="60" 
                        step="1" 
                    />
                    <span>{duration} months</span>
                </div>

                <div className="form-group">
                    <label>Projected Returns</label>
                    <div className="returns-display">
                        ${projectedReturns}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Save Investment</button>
            </form>
        )
    }
}

export default AddInvesmentAmountForm
